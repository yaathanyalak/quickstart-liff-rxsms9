// Import stylesheets test yaa
import './style.css';

// Import custom function by Pure
import './custom.js';

// Body element
const body = document.getElementById('body');

// Button elements
const btnSend = document.getElementById('btnSend');
// const btnLogIn = document.getElementById('btnLogIn');
// const btnLogOut = document.getElementById('btnLogOut');

// Profile elements
// const pictureUrl = document.getElementById('pictureUrl');
const userId = document.getElementById('userId');
const displayName = document.getElementById('displayName');
// const statusMessage = document.getElementById('statusMessage');
// const email = document.getElementById('email');

async function main() {
  // Initialize LIFF app)
  await liff.init({ liffId: '1656781519-El318ALA' });

  // Try a LIFF function
  switch (liff.getOS()) {
    case 'android':
      // body.style.backgroundColor = '#A3D5FA';
      break;
    case 'ios':
      // body.style.backgroundColor = '#eeeeee';
      break;
    case 'web':
      // body.style.backgroundColor = '#eeeeee';
      break;
  }

  // Check Login
  if (!liff.isInClient()) {
    // if (liff.isLoggedIn()) {
    //   btnLogIn.style.display = 'none';
    //   btnLogOut.style.display = 'block';
    //   getUserProfile();
    // } else {
    //   btnLogIn.style.display = 'block';
    //   btnLogOut.style.display = 'none';
    // }
  } else {
    btnSend.style.display = 'block';
    getUserProfile();
  }
}
main();

async function getUserProfile() {
  const profile = await liff.getProfile();
  // pictureUrl.src = profile.pictureUrl;
  // userId.innerHTML = '<b>userId:</b> ' + profile.userId;
  // displayName.innerHTML = '<b>displayName:</b> ' + profile.displayName;
  // statusMessage.innerHTML = '<b>statusMessage:</b> ' + profile.statusMessage;
  // email.innerHTML = '<b>email:</b> ' + liff.getDecodedIDToken().email;

  $('#userId').val(profile.userId);
}

// Listener's button
// btnLogIn.onclick = () => {
//   liff.login();
// };
// btnLogOut.onclick = () => {
//   liff.logout();
//   window.location.reload();
// };
btnSend.onclick = () => {
  // sendMsg();
  liff.closeWindow();
  // alert('#btnSend click');
};

$('#section_content').click(function () {
  liff.closeWindow();
});

// not use
async function sendMsg() {
  // var province_id = $('#selectProvince').val();
  // var district_id = $('#selectDistrict').val();

  var sel = document.getElementById('selectDam');
  var sel_text = sel.options[sel.selectedIndex].text;

  // [ Message ]
  // var message = selectDam.value;
  var message = 'โครงการ : ' + sel_text;

  if (
    liff.getContext().type !== 'none' &&
    liff.getContext().type !== 'external'
  ) {
    await liff.sendMessages([
      {
        type: 'text',
        text: 'dam_' + message,
      },
    ]);
    // alert('Message sent');
    liff.closeWindow();
  }
}
