// styles
import './css/main.css';

// JavaScript files to include for the application
import firebasedb from './js/firebase';
import tool from './js/tools';


const date = new Date();
var main = {
    user_data: undefined,
    newfeed: [],
    showNewsFeed: function() {
          
          firebasedb.firebase.database().ref('newsfeed').on('value', (snap) => {
                
                
                $('#newsfeed-container').html('');
                this.newsfeed = tool.filter(tool.getObjectValues( snap.val() ), (i) => {
                    
                    return tool.includes(Object.keys( this.user_data.subscribed ), i.user_name);
                })
                
                for ( var j = this.newsfeed.length; j > 0; j-- ) {

                    var post = this.newsfeed[j - 1];
                    $('#newsfeed-container').append(`
                        <div class='post col-xs-5 col-sm-5 col-md-8 col-xs-offset-1 col-md-offset-3'>
                            <p id='date' class='pull-right'>${ post.date }</p>
                            
                            <div class='col-xs-3 col-sm-3 col-md-2'>
                                <img class='img img-rounded' src=${ this.user_data.profile.profilePic !== '' ? this.user_data.profile.profilePic: 'http://alumni.harvard.edu/sites/default/files/styles/trip_photo/public/trip/main_photo/panada.png?itok=vPVFcRTG' } />
                            </div>
                            
                            <p class='pull-left'>${ this.user_data.profile.user_name }</p>
                            
                            <h3 id='title'>${ post.title }<h3>
                            <p id='content' class='lead text-left'>${ post.content }</p>
                        </div>
                  `);
                }

          });

    },
    displayName: function() {

        $('#user_name').html(this.user_data.profile.user_name);
        $('title').text(`Profile - ${ this.user_data.profile.user_name }`);
    },
    emitPost: function( postObj, callback ) {

          var post = {
              id: Object.keys( this.user_data.posts ).length,
              user_name: this.user_data.profile.user_name,
              title: postObj.title,
              content: postObj.content,
              date: `${ date.getMonth() + 1 }/${ date.getDate() }'/${ date.getFullYear() }`
          };
          this.newsfeed = firebasedb.saveTo(`newsfeed/${ tool.hash() }`, post);
          
          return callback(null, post);
    },
    
    // subscribe: function( user_name ) {

    //     firebasedb.database().ref(`usersdb/${ user_name }/subscribers/${ this.user_data.profile.user_name }`).set( this.user_data.profile.email );
    // },
    // unsubscribe: function( user_name ) {

    //     var subscribers = firebasedb.database().ref(`usersdb/${ user_name }/subscribers`);
    //     var subs_arr = Object.keys( subscribers );
    //     for ( var l in subs_arr ) {

    //          if ( subs_arr[l] === this.user_data.profile.user_name ) {

    //              delete subscribers[ subs_arr[l] ];
    //          }
    //     }

    //     firebasedb.database().ref(`usersdb/${ user_name }/subscribers`).set( subscribers );
    // }
};

function switchTab( tab_name ) {
    
    console.log(`swicthing to ${ tab_name } tab.`);
    var tabs = ['#search-container', '#newsfeed-container', '#profile-container'];
    $(tab_name).show();
    
    for ( var t in tabs ) {
        
        if ( tab_name !== tabs[t] ) {
            
            $(tabs[t]).hide();
        }
    }
}


$('#app').hide();
firebasedb.firebase.auth().onAuthStateChanged(firebaseUser => {

    if ( firebaseUser ) {

      // assign the email and user_name from the firebaseUser obj
      var userObj = {
          user_name: firebaseUser.displayName.toLowerCase(),
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
                    if ( Object.keys( main.user_data.posts ).length === 0 ) {

                        $('#ui-message').html('You have no posts, you should make one');
                    }

                    $('#logout').click(function() {

                          return firebasedb.firebase.auth().signOut();
                    });
                    
                    $('.tab-btn').click(function() {
                        
                        switchTab(`#${ $(this).attr('id') }-container`);
                    })
                    
                    $('.search-tab').click(function() {
                        
                        typeOfQuery = $(this).attr('id');
                        if ( $('#query-search').val().length !== 0  ) {
                            
                            $('#results').html('');
                            firebasedb.searchdb({ type: typeOfQuery, query: $('#query-search').val()  }, (err, resp) => {
                                if (err) return console.log(err.msg);
                                
                                console.log( resp );
                                // for ( var j in resp ) {
                                    
                                //     if ( typeOfQuery === 'user' ) {
                                        
                                //         var profile = resp[j]
                                //         $('#results').append(`<div class='col-xs-5 col-sm-5 col-md-4'>
                                //             <div class='col-xs-3 col-sm-3 col-md-3'>
                                //                 <img class='img img-round' src='${ profile.profile_pic }' />
                                //             </div>
                                //             <h2>${ profile.user_name }</h2>
                                            
                                //             ${ 
                                //                 tool.includes(main.user_data.subscribed, profile.user_name) ? 
                                //                 "<button id='unsubcribe' class='btn btn-dnager'>unsubcribe</button>" :
                                //                 "<button id='subcribed' class='btn btn-default'>subscribe</button>"
                                //             }
                                            
                                //             ${ profile.hashtags.map((t) => `<li>#${ t }</li>` ) }
                                //         </div>`);
                                //     }
                                // }   
                            })
                        }
                    });
                    $('#query-search').keyup(function(e) {
                        
                        switchTab('#search-container');
                        if ( $('#query-search').val().length !== 0  ) {
                            
                            $('#query').text($('#query-search').val());
                            firebasedb.searchdb({ type: typeOfQuery, query: $('#query-search').val()  }, (err, resp) => {
                                if (err) return console.log(err.msg);
                                
                                console.log('index.js');
                                console.log( resp );
                            })
                        }
                        else {
                            
                            $('#results').html('');
                        }
                    });

                    // $('.subscribe').click(function() {

                    //     var user_name = $(this).attr('id');

                    //     main.subscribe( user_name );
                    // });

                    // $('.unsubcribe').click(function() {

                    //     var user_name = $(this).attr('id');

                    //     main.subscribe( user_name );
                    // });

                    $('#showPostContainer').click(function() {
                        
                        $('.post-container').show();
                    });
                    $('#closePostContainer').click(function() {
                        
                        $('.post-container').hide();
                    });
                    $('#submit').click(function () {
                        
                        
                        if ( $('#title').val().length !== 0 && $('#content').val().length !== 0 ) {

                              // emits the post to the global newsfeed
                              main.emitPost({ title: $('#title').val(), content: $('#content').val() }, (err, post) => {
                                  if (err) return console.log('post was made becasue of internal errors.');
                                  
                                  console.log( post );
                                  // returns back the post and adds to the user post
                                  main.user_data.posts = firebasedb.saveTo(`usersdb/${ main.user_data.profile.user_name }/posts/${ tool.hash() }`, post);

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
