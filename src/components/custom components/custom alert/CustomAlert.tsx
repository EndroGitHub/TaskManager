import "./CustomAlert.css";

type customAlertPropsType = {
  msg: string;
  type: string;
  cancelFunc?: () => void;
  optionFunc?: (value1: boolean) => void;
};

const CustomAlert = (props: customAlertPropsType) => {
  return (
    <>
      <div className="custom-alert-outer">
        <div className="custom-alert-alert">
          <p>{props.msg}</p>
          {props.type === "normal" ? (
            <header>
              <button
                onClick={() => {
                  if (props.cancelFunc) {
                    props.cancelFunc();
                  }
                }}
              >
                OK
              </button>
            </header>
          ) : (
            <header>
              <button
                onClick={() => {
                  if (props.optionFunc) {
                    props.optionFunc(true);
                  }
                }}
              >
                YES
              </button>
              <button
                onClick={() => {
                  if (props.optionFunc) {
                    props.optionFunc(false);
                  }
                }}
              >
                NO
              </button>
            </header>
          )}
        </div>
      </div>
    </>
  );
};

export default CustomAlert;
