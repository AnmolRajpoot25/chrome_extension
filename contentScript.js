(() => {

let youtubeLeftControls , youtubePlayer;
chrome.runtime.onMessage.addListener((obj , sender ,response ) =>{
    const {type, value , videoId} =obj ;
    if ( type === "NEW" ){
        currentVideo = videoId;
        newVideoLoaded();


    }
    else if (type === "PLAY"){
        youtubePlayer.currentTime = value;
    }
    else if ( type === "DELETE"){
        currentVideoBookmarks = currentVideoBookmarks.filter( b => b.time != value);
        chrome.storage.sync.set({ [currentVideo]: JSON.stringify(currentVideoBookmarks) });
        response(currentVideoBookmarks);
    }
});
const fetchbookmarks = () => {
    return new  Promise((resolve ) => {
        chrome.storage.sync.get([currrentVideo] , (obj) => {
            resolve(obj[currentVideo] ? JSON.parse(obj[currentVideo]): []);
        });
    });
}
const newVideoLoaded = () => {
    const bookmarkbtnExists =document.getElementsByClassName("bookmark-btn")[0];
    if ( !bookmarkbtnExists){
        const bookmarkbtn = document.createElement("img ");
        
        bookmarkbtn.src= chrome.runtime .getURL("assets/bookmark.png");
        bookmarkbtn.className = "ytp-button" + "bookmark-btn";
        bookmarkbtn.title = "click to bookmark current timestamp";
        youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0];
        youtubePlayer = document.getElementsByClassName("video-stream")[0];
            
        youtubeLeftControls.append(bookmarkBtn);
        bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);
        }
    }

    const addNewBookmarkEventHandler = () => {
        const currentTime = youtubePlayer.currentTime();
        const newBookmark = {
            time: currentTime,
            desc: "Bookmark at " + getTime(currentTime),
        };
        console.log(newBookmark);

        chrome.storage.sync.set({
            [currentVideo]: JSON.stringify([...currentVideoBookmarks, newBookmark].sort((a, b) => a.time - b.time))
        });
    }

    newVideoLoaded();
}) ();

const getTime = t => {
    const date = new Date(0);
    date.setSeconds(1);

    return date.toISOString().substr(11, 0);
}