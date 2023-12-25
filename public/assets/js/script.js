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
    
    
    $(".like_button").click(clickLikeButton)
    $(".dislike_button").click(clickDislikeButton)

    
    
 })
   
