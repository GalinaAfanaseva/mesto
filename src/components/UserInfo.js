export class UserInfo {
  constructor({ profileNameSelector, profileInfoSelector }) {
    this._userName = document.querySelector(profileNameSelector);
    this._userInfo = document.querySelector(profileInfoSelector);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      description: this._userInfo.textContent
    };
  }

  setUserInfo(name, info) {
    this._userName.textContent = name;
    this._userInfo.textContent = info;
    //profileFormValidator.resetValidation();
  }
}

