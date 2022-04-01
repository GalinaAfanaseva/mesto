export class UserInfo {
  constructor({ profileNameSelector, profileInfoSelector }) {
    this._userName = document.querySelector(profileNameSelector);
    this._userInfo = document.querySelector(profileInfoSelector);
  }

  getUserInfo() {
    return {
      name: this._userName,
      description: this._userInfo
    };
  }

  setUserInfo(Name, Info) {
    this._userName.textContent = Name;
    this._userInfo.textContent = Info;
    //profileFormValidator.resetValidation();
  }
}

