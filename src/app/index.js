// styles
import './css/main.css';

// JavaScript files to include for the application
import firebasedb from './js/firebase';
// import Emit from './emit.js';

var main = {
    user_data: undefined,
    showNewsFeed: function() {

          if ( Object.keys( this.user_data.posts ).length !== 0 ) {

              $('.newsfeed-container').html('');

              for ( var j = this.user_data.posts.length; j > 0; j-- ) {

                  var post = this.user_data.posts[j - 1];
                  $('.newsfeed-container').append(`
                      <div class='post col-xs-5 col-sm-5 col-md-8 col-xs-offset-1 col-md-offset-3'>
                          <p class='pull-right'>${ post.date }</p>

                          <img style='height: 50px; width: 50px;' class='img img-rounded' src=${ this.user_data.profile.profilePic !== '' ? user_data.profile.profilePic: 'http://alumni.harvard.edu/sites/default/files/styles/trip_photo/public/trip/main_photo/panada.png?itok=vPVFcRTG' }
                          <p class='pull-left'>${ this.user_data.profile.user_name }</p>
                          <h3>${ post.title }<h3>
                          <p class='lead text-center'>${ post.content }</p>
                      </div>
                 `);
               }
         }
         else {

              $('#ui-message').html('You have no posts, you should make one');
        }
    },
    displayName: function() {

        $('#user_name').html(this.user_data.profile.user_name);
        $('#email').html(this.user_data.profile.email);
    },
    makePost: function() {

        var title = $('#title').val();
        var content = $('#content').val();
        if ( title.length !== 0 && content.length !== 0 ) {

            this.user_data.posts = firebasedb.saveTo(`usersdb/${ this.user_data.profile.user_name }/posts/${ Object.keys( this.user_data.posts ).length }`,
            {
                id: Object.keys( this.user_data.posts ).length,
                title: title,
                content: content
            });

            $('#title').val('');
            $('#content').val();
        }
    }
};


$('#app').hide();
firebasedb.firebase.auth().onAuthStateChanged(firebaseUser => {

    if ( firebaseUser ) {

      var userObj = {
          user_name: firebaseUser.displayName,
          email: firebaseUser.email
      };

      firebasedb.getUser( userObj, (err, user_data ) => {

              $('#app').show();
              console.log(`You are now logged in ${ firebaseUser.email }`);

              main.user_data = user_data;
              $(document).ready(function() {

                    main.displayName();

                    main.showNewsFeed();

                    $('#logout').click(function() {

                          return firebasedb.firebase.auth().signOut();
                    });

                    $('#submit').click(function () {

                          main.makePost();
                    });
              });
      });

    }
    else {

        window.open('auth.html', '_self');
    }
});
