import React, { useEffect, useState } from "react";
import SVG from "../SVG";
import Icons from "../../public/assets/svg/icon";
import { useSelector } from "react-redux";
import { child, onValue, push, ref, set } from "firebase/database";
import { database } from "../../pages/firebase-config";
import { toast } from "react-toastify";
import moment from "moment";

export default function ChatBox() {
  const [open, setOpen] = useState(false);
  const [valueChat, setValueChat] = useState("");
  const [dataChatBox, setDataChatBox] = useState([]);

  const theme = useSelector((state) => state?.common?.theme);
  const user = useSelector((state) => state?.common?.user);

  const readMess = (data, index) => {
    const { id } = data;
    if (dataLastMess?.[id]?.id !== currentId) {
      handleSentLastMess({ ...dataLastMess?.[id], isNew: false }, index);
    }
  };

  const getData = () => {
    // readMess(data, index);
    const dataRef = ref(database, `chats/chat_box/${user?.id}`);
    onValue(dataRef, (snapshot) => {
      const getData = snapshot?.val();
      if (getData) {
        const mixData = Object.keys(getData).map((r) => {
          return { ...getData[r] };
        });
        if (mixData) {
          setDataChatBox(mixData);
        }
      }
    });
  };

  useEffect(() => {
    getData();
  }, [user, open]);

  const handleClick = () => {
    if (user?.id) {
      setOpen(!open);
    } else {
      toast.error(`Vui lòng đăng nhập để sử dụng chức năng này`);
    }
  };

  const handleSentLastMess = (params) => {
    const dataRef = ref(database, `chats/last_mess/${user?.id}`);
    set(dataRef, params)
      .then(() => {})
      .catch((error) => {});
  };

  const handleSend = () => {
    const timeSent = moment().format("DD/MM/YYYY hh:mm:ss");
    const paramsChat = {
      chat: valueChat,
      id: user?.id,
      create_at: timeSent,
    };
    const newKey = push(child(ref(database), "chats")).key;
    if (valueChat !== "") {
      const dataRef = ref(database, `chats/chat_box/${user.id}/${newKey}`);
      set(dataRef, paramsChat)
        .then(() => {
          handleSentLastMess({ ...paramsChat, isNew: true });
        })
        .catch((error) => {
          toast.error(`${error}`);
        });
    }
    setValueChat("");
  };

  const handleSelectFile = () => {};

  return (
    <div className="chat-box-custom">
      <div className="chat-box-icon">
        <div onClick={handleClick}>
          <SVG src={Icons.chat} size={32} color={"#f8f8f8"} />
        </div>
      </div>
      {open ? (
        <div className="chat-container">
          <div
            style={{
              width: "100%",
              height: 70,
              backgroundColor: "#ff4c3b",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ width: "90%" }}>
              <span style={{ color: "#f9f9f9", fontSize: 18 }}>
                Chat với nhân viên hổ trợ tư vấn
              </span>
            </div>
            <div onClick={() => setOpen(false)}>
              <span
                style={{ color: "#f9f9f9", fontSize: 18, cursor: "pointer" }}
              >
                X
              </span>
            </div>
          </div>
          <div
            style={{ width: "100%", height: 378, padding: 16 }}
            className="chat-body scrollbar"
          >
            {(dataChatBox || []).map((r, index) => (
              <div
                key={`${r?.id}-${index}`}
                style={{
                  position: "relative",
                  backgroundColor: r?.id == user?.id ? "#ff4c3b" : "#ffffff",
                  maxWidth: "70%",
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: r?.id == dataChatBox[index + 1]?.id ? 7 : 21,
                  marginLeft: r?.id == user?.id ? "30%" : 0,
                  color: r?.id == user?.id ? "white" : "black",
                }}
              >
                <span className="text-chat" style={{ wordWrap: "break-word" }}>
                  {r?.chat}
                </span>
                <div>
                  <span
                    style={{
                      position: "absolute",
                      fontSize: 12,
                      right: 10,
                      bottom: -2,
                    }}
                  >
                    {r?.create_at}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              borderTop: "1px solid gray",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div className={`input-custom ${theme ? "is-theme" : ""}`}>
              <input
                // style={{ backgroundColor: "red" }}
                className={`input-search ${theme ? "is-theme" : ""}`}
                onChange={(e) => {
                  setValueChat(e.target.value);
                }}
                placeholder="Nhập nội dung"
                value={valueChat}
              />
            </div>
            <div
              style={{ width: "7%", cursor: "pointer" }}
              onClick={handleSelectFile}
            >
              <SVG src={Icons.attach} size={24} />
            </div>
            <div
              style={{ width: "7%", cursor: "pointer" }}
              onClick={handleSend}
            >
              <SVG src={Icons.emoji} size={24} />
            </div>
            <div
              style={{ width: "7%", cursor: "pointer" }}
              onClick={handleSend}
            >
              <SVG src={Icons.send} color={"#ff4c3b"} size={24} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
