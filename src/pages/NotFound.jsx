import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="noPage">
      <h1>404 Not Found</h1>
      <p>The server was found but could not find the requested page</p>
      <p className="waterMark">MazerModels</p>
    </div>
  );
};

export default NotFound;
