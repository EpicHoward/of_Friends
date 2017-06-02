// styles
import './css/main.css';

// JavaScript files to include for the application
import firebasedb from './js/firebase';
import tool from './js/tools';

var main = {
    user_data: undefined,
    newfeed: [],
    showNewsFeed: function() {

          firebasedb.database().ref('newsfeed').on('value', (snap) => {

                console.log(snap.val());

                this.newsfeed = snap.val().filter((i) => {

                    return tool.includes(Object.keys( this.user_data.subscribers ), i.user_name);
                })

                $('.newsfeed-container').html('');

                for ( var j = this.newsfeed; j > 0; j-- ) {

                    var post = this.newsfeed[j - 1];
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

          });

    },
    displayName: function() {

        $('#user_name').html(this.user_data.profile.user_name);
        $('#email').html(this.user_data.profile.email);
    },
    emitPost: function( postObj, callback ) {

          this.newsfeed = firebasedb.saveTo(`newsfeed/${ tool.hash() }`,
          {
              id: Object.keys( this.user_data.posts ).length,
              user_name: this.user_data.profile.user_name,
              title: postObj.title,
              content: postObj.content,
              date: `${ date.getMonth() + 1 }/${ date.getDate() }'/${ date.getFullYear() }`
          });
    },
    subscribe: function( user_name ) {

         firebasedb.database().ref(`usersdb/${ user_name }/subscribers/${ this.user_data.profile.user_name }`).set( this.user_data.profile.email );
    },
    unsubscribe: function( user_name ) {

        var subscribers = firebasedb.database().ref(`usersdb/${ user_name }/subscribers`);
        var subs_arr = Object.keys( subscribers );
        for ( var l in subs_arr ) {

             if ( subs_arr[l] === this.user_data.profile.user_name ) {

                 delete subscribers[ subs_arr[l] ];
             }
        }

        firebasedb.database().ref(`usersdb/${ user_name }/subscribers`).set( subscribers );
    }
};

$('#app').hide();
firebasedb.firebase.auth().onAuthStateChanged(firebaseUser => {

    if ( firebaseUser ) {

      // assign the email and user_name from the firebaseUser obj
      var userObj = {
          user_name: firebaseUser.displayName.toLowerCae(),
          email: firebaseUser.email
      };

      // get the users information
      firebasedb.getUser( userObj, (err, user_data ) => {

              $('#app').show();
              console.log(`You are now logged in ${ firebaseUser.email }`);

              main.user_data = user_data;
              $(document).ready(function() {

                    // used for the search query, the default is 'users'
                    var typeOfQuery = 'users';

                    // display the profile information
                    main.displayName();

                    // this displays all the newsfeed post made by other users
                    main.showNewsFeed();

                    // if the user neve mad a post display this ui message
                    if ( Object.keys( this.user_data.posts ).length === 0 ) {

                        $('#ui-message').html('You have no posts, you should make one');
                    }

                    $('#logout').click(function() {

                          return firebasedb.firebase.auth().signOut();
                    });

                    $('#query-search').keydown(function(e) {

                          firebasedb.searchdb({  })
                    });

                    $('.subscribe').click(function() {

                        var user_name = $(this).attr('id');

                        main.subscribe( user_name );
                    });

                    $('.unsubcribe').click(function() {

                        var user_name = $(this).attr('id');

                        main.subscribe( user_name );
                    });

                    $('#submit').click(function () {

                        if ( title.length !== 0 && content.length !== 0 ) {

                              // emits the post to the global newsfeed
                              main.emitPost({ title: $('#title').val(), content: $('#content').val() }, (err, post) => {
                                  if (err) return console.log('post was made becasue of internal errors.');

                                  // returns back the post and adds to the user post
                                  main.user_data.posts = firebasedb.saveTo(`usersdb/${ this.user_data.profile.user_name }/posts/${ tool.hash() }`, post);

                                  // empties the users title and content textareas
                                  $('#title').val('');
                                  $('#content').val('');
                              });
                        }
                    });
              });
      });

    }
    else {

        // if the user is logged in then transfer them to the auth page
        window.open('auth.html', '_self');
    }
});
