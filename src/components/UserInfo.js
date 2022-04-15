export class UserInfo {
  constructor({ profileNameSelector, profileInfoSelector, profileAvatarSelector }) {
    this._userName = document.querySelector(profileNameSelector);
    this._userInfo = document.querySelector(profileInfoSelector);
    this._userAvatar = document.querySelector(profileAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      description: this._userInfo.textContent
    };
  }

  setUserInfo(name, info, avatar) {
    this._userName.textContent = name;
    this._userInfo.textContent = info;
    this._userAvatar.style.backgroundImage = `url('${avatar}')`;
  }
}

