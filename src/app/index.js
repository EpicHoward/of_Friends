// styles
import './css/main.css';

// JavaScript files to include for the application
import sendNewLetter from './js/newsletter';
import firebasedb from './js/firebase';
import newsfeed from './js/newsfeed';


$('#app').hide();
const auth = firebasedb.firebase.auth();

firebasedb.firebase.auth().onAuthStateChanged(firebaseUser => {

    var userObj;
    if ( firebaseUser ) {

      userObj = {
          user_name: firebaseUser.displayName,
          email: firebaseUser.email
      };

      firebasedb.getUser( userObj, (err, user_data ) => {
          $('#app').show();

          // console.log(`You are now logged in ${ firebaseUser.email }`);

          $(document).ready(function() {

              $('#user_name').html(`${ user_data.profile.frist_name } ${ user_data.profile.last_name }`);
              $('#email').html(user_data.profile.email);

              if ( Object.keys( user_data.posts ).length !== 0 ) {

                  $('.newsfeed-container').html('');

                  for ( var j = user_data.posts.length; j > 0; j-- ) {

                      var post = user_data.posts[j - 1];
                      $('.newsfeed-container').append(`
                        <div class='post col-xs-5 col-sm-5 col-md-8 col-xs-offset-1 col-md-offset-3'>
                             <h3>${ post.title }<h3>
                             <p class='lead text-center'>${ post.content }</p>
                        </div>
                      `);
                  }
              }
              else {

                  $('#ui-message').html('You have no posts, you should make one');
              }

              $('#logout').click(function() {

                  return firebasedb.firebase.auth().signOut();
              });


              $('#submit').click(function () {

                  var title = $('#title').val();
                  var content = $('#content').val();
                  if ( title.length !== 0 && content.length !== 0 ) {

                      user_data.posts = firebasedb.saveTo(`usersdb/${ user_data.profile.frist_name } ${ user_data.profile.last_name }/posts/${ Object.keys( user_data.posts ).length }`,
                      {
                        id: Object.keys( user_data.posts ).length,
                        title: title,
                        content: content
                      });
                  }
              });
          });
      });

    }
    else {

        alert('logging out.');
        window.open('auth.html', '__blank');
    }
});
