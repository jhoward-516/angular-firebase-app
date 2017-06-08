import { AngularFirebaseAppPage } from './app.po';

describe('angular-firebase-app App', () => {
  let page: AngularFirebaseAppPage;

  beforeEach(() => {
    page = new AngularFirebaseAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
