import Marquee from "react-fast-marquee";
import ReactPlayer from "react-player/lazy";
export default function Home() {
  return (
    <div>
      <div>
        <Marquee style={{ color: "green", fontSize: "2em" }}>  
          Welcome to Invoice Management System
        </Marquee>
        <br />
        <h1>
          <center>Invoice Management System</center>
        </h1>     
      </div>
      <br />
      <br />

      <h4 style={{ justifyContent: "center", display: "flex" }}>Play Videos</h4>
      <div style={{ justifyContent: "center", display: "flex" }}>
        <ReactPlayer
          width="900px"
          height="400px"
          controls
          url="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=video&cd=&cad=rja&uact=8&ved=2ahUKEwi43qfdj_b5AhXfSGwGHfgVDyIQtwJ6BAgSEAI&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fvideos%2Fforest%2F&usg=AOvVaw1WzlDVBSm2PY3W9-32WffF"
          onReady={() => console.log("onReady callback")}
          onStart={() => console.log("onStart callback")}
          onPause={() => console.log("onPause callback")}
          onEnded={() => console.log("onEnded callback")}
          onError={() => console.log("onError callback")}
        />
      </div>
      <br />
      <br />
      {/* Video player end */}
    </div>
  );
}
