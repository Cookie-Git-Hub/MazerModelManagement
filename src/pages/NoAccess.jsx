import "./NoAccess.css";

const NoAccess = () => {
  return (
    <div className="noAccess">
      <h1>HTTP 403 Forbidden</h1>
      <p>
        You are not allowed to access the page, file or folder whose URL you
        entered in the address bar
      </p>
      <p className="waterMark">MazerModels</p>
    </div>
  );
};

export default NoAccess;
