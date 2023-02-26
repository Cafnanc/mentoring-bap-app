import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { JsonFormData } from 'src/app/shared/components/dynamic-form/dynamic-form.component';
import { CommonRoutes } from 'src/global.routes';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { SKELETON } from 'src/app/core/constants/skeleton.constant';
import { Router } from '@angular/router';
import { localKeys } from 'src/app/core/constants/localStorage.keys';
import { ProfileService } from 'src/app/core/services/profile/profile.service';
import { HttpService, LoaderService, LocalStorageService, ToastService, UserService, UtilService } from 'src/app/core/services';
import { urlConstants } from 'src/app/core/constants/urlConstants';
import { SessionService } from 'src/app/core/services/session/session.service';
import { TermsAndConditionsPage } from '../../terms-and-conditions/terms-and-conditions.page';
interface sessionData {
  itemId: string;
  fulfillmentId: string;
  title: string;
  description: string;
  image: string;
  status: string;
  startDate: string;
  endDate: string;
  isEnrolled: boolean;
  mentorName: string;
  recommendedFor: string[];
  categories: Array<string>;
  medium: string[];
  providerName: string;
  bppName: string;
  context: object;
} 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public formData: JsonFormData;
  user;
  SESSIONS: string = CommonRoutes.SESSIONS;
  SKELETON = SKELETON;
  page = 1;
  limit = 100;
  sessions;
  sessionsCount = 0;
  status = "published,live";

  public headerConfig: any = {
    menu: true,
    notification: true,
    headerColor: 'primary',
    // label:'MENU'
  };
  public segmentButtons = [{ name: "all-sessions", label: "ALL_SESSIONS" }, { name: "created-sessions", label: "CREATED_SESSIONS" }, { name: "my-sessions", label: "ENROLLED_SESSIONS" }]
  public mentorSegmentButton = ["created-sessions"]
  selectedSegment = "all-sessions";
  createdSessions: any;
  searchText: string = "";
  categories = [];
  providersItems = [];
  fulfillments = [];
  isAMentor: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private profileService: ProfileService,
    private loaderService: LoaderService,
    private httpService: HttpService,
    private sessionService: SessionService,
    private modalController: ModalController,
    private userService: UserService,
    private localStorage: LocalStorageService,
    private toast: ToastService) { }

  ngOnInit() {
    this.getUser();
    this.userService.userEventEmitted$.subscribe(data => {
      if (data) {
        this.user = data;
      }
    })
  }

  async ionViewWillEnter() {
    // this.getSessions();
    // var obj = { page: this.page, limit: this.limit, searchText: "" };
    // this.createdSessions = await this.sessionService.getAllSessionsAPI(obj);
  }
  async eventAction(event) {
    switch (event.type) {
      case 'cardSelect':
        this.router.navigate([`/${CommonRoutes.SESSIONS_DETAILS}/`], {state: {data: event.data}});
        break;

      case 'joinAction':
        (event.data.sessionId) ? await this.sessionService.joinSession(event.data.sessionId) : await this.sessionService.joinSession(event.data._id);
        this.getSessions();
        break;

      case 'enrollAction':
        // let enrollResult = await this.sessionService.enrollSession();
        // if (enrollResult.result) {
        //   this.toast.showToast(enrollResult.message, "success")
        //   this.getSessions();
        // }
        break;

      case 'startAction':
        this.sessionService.startSession(event.data._id);
        this.getSessions();
        break;
    }
  }
  viewMore(data) {
    this.router.navigate([`/${CommonRoutes.SESSIONS}`], { queryParams: { type: data } });
  }

  getUser() {
    this.profileService.profileDetails().then(data => {
      this.user = data
      this.isAMentor = this.user.isAMentor;
      if (!this.user?.hasAcceptedTAndC) {
        this.openModal();
      }
    })
  }

  async getSessions() {
    const config = {
      url: urlConstants.API_URLS.HOME_SESSION + this.page + '&limit=' + this.limit,
    };
    try {
      let data: any = await this.httpService.get(config);
      this.sessions = data.result;
      this.sessionsCount = data.result.count;
    }
    catch (error) {
    }
  }
  async openModal() {
    const modal = await this.modalController.create({
      component: TermsAndConditionsPage,
      backdropDismiss: false,
      swipeToClose: false
    });
    return await modal.present();
  }
  async segmentChanged(event) {
    this.selectedSegment = event.name;
  }
  async createSession() {
    let userDetails = await this.localStorage.getLocalData(localKeys.USER_DETAILS);
    if (userDetails?.about) {
      this.router.navigate([`${CommonRoutes.CREATE_SESSION}`]);
    } else {
      this.router.navigate([`/${CommonRoutes.TABS}/${CommonRoutes.PROFILE}`]);
    }
  }
  checkInput() {
    this.searchText = this.searchText.replace(/^ +/gm, '')
  }

  async search() {
    let sessionData = await this.getSessionsFromBAPServer();
    this.sessions = await this.arrangeSessionDetails(sessionData);
    console.log(this.sessions)
  }
  async getSessionsFromBAPServer() {
    await this.loaderService.startLoader();
    this.categories = this.providersItems = this.fulfillments = [];
    const config = {
      url: urlConstants.API_URLS.SEARCH_SESSION + this.searchText
    };
    try {
      let data: any = await this.httpService.get(config);
      console.log(data)
      if(Array.isArray(data.data)){
        await this.loaderService.stopLoader();
        return data.data;
      }else{
        await this.loaderService.stopLoader();
        throw Error();
      }
    }
    catch (error) {
      await this.loaderService.stopLoader();
    }
  }

  async arrangeSessionDetails(dataArray: any[]) {
    console.log(dataArray)
    dataArray.forEach( bppData => {
      console.log(bppData)
      bppData.message.catalog['providers'].forEach(provider => {
        provider.items.map(item => {
          item.context = bppData.context;
          item.providerName = provider.descriptor.name;
          item.bppName = bppData.message.catalog['descriptor'].name;
          this.categories = this.categories.concat(provider['categories']);
          this.fulfillments = this.fulfillments.concat(provider['fulfillments']);
        })
        this.providersItems = this.providersItems.concat(provider.items);
      })
    });
    let sessions = await this.mapSessionDetails();
    // this.sessions = sessions;
    return sessions;
  }


  mapSessionDetails(): Promise<Array<object>> {
    let i = 0;
    return new Promise((resolve, reject) => {
      let sessions = [];
      this.providersItems.forEach( session => {
        let categories = [];
        let fulfillment = this.fulfillments.find(element => element.id === session.fulfillment_id)
        console.log(this.categories)
        console.log(session)
        categories = categories.concat(this.categories.find(element => element.id === session.category_id).descriptor.name)
        let sessionData: sessionData = {
          itemId: session.id,
          fulfillmentId: fulfillment.id,
          title: session.descriptor.name,
          description: session.descriptor.long_desc,
          image: session.descriptor.images[0],
          status: fulfillment.tags.status,
          startDate: fulfillment.start.time.timestamp,
          endDate: fulfillment.end.time.timestamp,
          isEnrolled: false,
          mentorName: fulfillment.agent.name,
          recommendedFor: session.tags.recommended_for,
          categories: categories,
          medium: fulfillment.language,
          providerName: session.providerName,
          bppName: session.bppName,
          context: session.context
        }
        sessions = sessions.concat(sessionData);
      })
      i++;
      console.log(i)
      resolve(sessions)
    })
  }
}
