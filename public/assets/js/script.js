 $(function(){
  var clickLikeButton = function() {
    var id = $(this).data("id");
    var likeCountString = $(`.like_count_${id}`).text()
   $.ajax({
       url: "/like",
       type: "GET",
       data: {
           id: id
       },
       dataType: "json"
   }).then(function(data){
       if(data["like"]){
            $(`.like_status_${id}`).removeClass("fa-regular").addClass("fa-solid")
            
            var likeCountInt = parseInt(likeCountString) + 1
            $(`.like_count_${id}`).text(likeCountInt.toString())
            
            console.log('like');
       }else{
            $(`.like_status_${id}`).removeClass("fa-solid").addClass("fa-regular")
            
            var likeCountInt = parseInt(likeCountString) - 1
            $(`.like_count_${id}`).text(likeCountInt.toString())
            
            console.log("dislike");
       }
   });
   return false
    }
    
    var clickDislikeButton = function() {
    var id = $(this).data("id");
    var dislikeCountString = $(`.dislike_count_${id}`).text()
   $.ajax({
       url: "/dislike",
       type: "GET",
       data: {
           id: id
       },
       dataType: "json"
   }).then(function(data){
       if(data["dislike"]){
            $(`.dislike_status_${id}`).removeClass("fa-regular").addClass("fa-solid")
            
            var dislikeCountInt = parseInt(dislikeCountString) + 1
            $(`.dislike_count_${id}`).text(dislikeCountInt.toString())
            
       }else{
            $(`.dislike_status_${id}`).removeClass("fa-solid").addClass("fa-regular")
            
            var dislikeCountInt = parseInt(dislikeCountString) - 1
            $(`.dislike_count_${id}`).text(dislikeCountInt.toString())
            
       }
   });
   return false
    }
    
    var deletePost = function() {
    var postId = $(this).data("post-id");
    var postElement = $(`#post_${postId}`);
    
      postElement.animate({ height: 0, opacity: 0 }, "300", function() {     
       $.ajax({
        url: `/delete/${postId}`,
        type: "DELETE",
        dataType: "json"
      }).then(function(data) {
        if (data.success) {
          postElement.remove();
        } else {
          postElement.fadeIn();
        }
      });
    });
    return false;
  };
   // $.ajax({
   //     url: `/delete/${postId}`,
   //     type: "DELETE",
   //     dataType: "json"
   // }).then(function(){
   //     $(`#post_${postId}`).remove();
   // });
   // return false
   //  }
    
        $(document).ready(function() {
    $('.btn_delete').on('click', deletePost);
     });
    
    
    $(".like_button").click(clickLikeButton)
    $(".dislike_button").click(clickDislikeButton)
    
    // $('.btn_delete').click(deletePost)
    

    
    // $(document).ready(function() {
    //  $('.btn_delete').on('click', deletePost);
    // });
    
    
    
//   document.addEventListener('DOMContentLoaded', () => {
//   document.querySelectorAll('.btn_delete').forEach(button => {
//     button.addEventListener('click', function() {
//       const postId = this.getAttribute('data-post-id');
//       fetch(`/delete/${postId}`, {
//         method: 'GET',
//       })
//       .then(response => response.json())
//       .then(data => {
//         if (data.success) {
//           document.getElementById(`post_${postId}`).remove();
//         } else {
//           // エラー処理
//           alert("削除に失敗しました");
//         }
//       });
//     });
//   });
// });


    
    
 })
   
