import React, { useEffect, useRef, useState } from "react";
import SVG from "../SVG";
import Icons from "../../public/assets/svg/icon";
import { useDispatch, useSelector } from "react-redux";
import { child, onValue, push, ref, set } from "firebase/database";
import { database, storage } from "../../firebase-config";
import moment from "moment";
import {
  getDownloadURL,
  uploadBytes,
  ref as storageRef,
} from "firebase/storage";
import EmojiPicker from "emoji-picker-react";
import { setToasterGlobal } from "../../redux/reducers/common";
import TooltipCustom from "../tooltipCustom";

export default function ChatBox() {
  const inputRef = useRef();
  const emojiRef = useRef();
  const messEndRef = useRef();

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [valueChat, setValueChat] = useState("");
  const [dataChatBox, setDataChatBox] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [openEmoji, setOpenEmoji] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);

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
      dispatch(
        setToasterGlobal({
          active: true,
          mess: `Vui lòng đăng nhập để sử dụng chức năng này`,
          status: "error",
        })
      );
    }
  };

  const handleSentLastMess = (params) => {
    // add list user chat
    const userRef = ref(database, `chats/data_user/${user.id}`);
    set(userRef, user)
      .then(() => {})
      .catch((error) => {});
    //
    const dataRef = ref(database, `chats/last_mess/${user?.id}`);
    set(dataRef, params)
      .then(() => {})
      .catch((error) => {});
  };

  const handleUploadImg = async () => {
    const id = `${selectedFile?.lastModified}-${selectedFile?.size}`;
    const ref = storageRef(storage, `chat/${user?.id}/${id}`);
    return uploadBytes(ref, selectedFile)
      .then(async (snapshot) => {
        // lấy url image vừa up
        const url = await getDownloadURL(ref);
        const image = {
          url: url,
          id: id,
        };
        return image;
      })
      .catch((error) => {
        dispatch(
          setToasterGlobal({
            active: true,
            mess: `${error}`,
            status: "error",
          })
        );
        return false;
      });
  };

  const handleSend = async () => {
    const timeSent = moment().format("DD/MM/YYYY hh:mm:ss");
    let paramsChat = {
      chat: valueChat,
      id: user?.id,
      create_at: timeSent,
    };
    const newKey = push(child(ref(database), "chats")).key;
    if (selectedFile) {
      const img = await handleUploadImg();
      if (img) {
        paramsChat.image = img;
      }
    }
    if (valueChat !== "" || selectedFile) {
      const dataRef = ref(database, `chats/chat_box/${user.id}/${newKey}`);
      set(dataRef, paramsChat)
        .then(() => {
          handleSentLastMess({ ...paramsChat, isNew: true });
        })
        .catch((error) => {
          dispatch(
            setToasterGlobal({
              active: true,
              mess: `${error}`,
              status: "error",
            })
          );
        });
    }
    inputRef.current.value = null;
    setSelectedFile(null);
    setOpenEmoji(false);
    setValueChat("");
    // document.getElementById("text").value = "";
  };

  const handleSelectFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleRemoveSelectFile = () => {
    inputRef.current.value = null;
    setSelectedFile(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  const handleEmojiClick = (emojiObject) => {
    const emoji = emojiObject.emoji;
    // setChosenEmoji(emojiObject);
    setValueChat(valueChat + emoji);
  };

  useEffect(() => {
    if (open) {
      messEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [open]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setOpenEmoji(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiRef]);

  return (
    <div className="chat-box-custom" style={{ zIndex: 1000 }}>
      <div className="chat-box-icon" onClick={handleClick}>
        <div>
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
            <div
              style={{
                position: "absolute",
                zIndex: 5,
                height: 100,
                bottom: 252,
              }}
              ref={emojiRef}
              className="emoji-contain"
            >
              <EmojiPicker
                open={openEmoji}
                emojiStyle="facebook"
                height={300}
                emojiVersion={`5.0`}
                searchDisabled={true}
                skinTonesDisabled={true}
                // reactionsDefaultOpen={true}
                showPreview={false}
                className="chat-emoji"
                onEmojiClick={handleEmojiClick}
              />
            </div>

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
            style={{
              width: "100%",
              height: !selectedFile ? 378 : 278,
              padding: 16,
              backgroundColor: theme ? "#2b2b2b" : "",
              borderLeft: theme ? "1px solid gray" : "",
            }}
            className="chat-body scrollbar"
          >
            {(dataChatBox || []).map((r, index) => (
              <div
                key={`${r?.id}-${index}`}
                style={{
                  position: "relative",
                  maxWidth: "70%",
                  marginBottom: r?.id == dataChatBox[index + 1]?.id ? 7 : 21,
                  marginLeft: r?.id == user?.id ? "30%" : 0,
                  color: r?.id == user?.id ? "white" : "black",
                }}
              >
                <TooltipCustom
                  placement={r?.id == user?.id ? "left" : "right"}
                  margin={r?.id == user?.id ? "left" : "right"}
                  title={moment(r?.createAt).format("DD/MM/YYYY hh:mm")}
                  contentRender={() => (
                    <div>
                      {r?.image ? (
                        <div
                          style={{
                            marginBottom: r?.chat ? 5 : "",
                          }}
                        >
                          <img
                            src={r?.image?.url}
                            // width={"50%"}
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://www.facoelche.com/images/placeholder-noimage.jpg";
                            }}
                            style={{ width: "100%", objectFit: "contain" }}
                            loading="lazy"
                          />
                        </div>
                      ) : null}
                      {r?.chat ? (
                        <div
                          id=""
                          style={{
                            backgroundColor:
                              r?.id == user?.id ? "#ff4c3b" : "#ffffff",
                            borderRadius: 8,
                            padding: 12,
                            wordWrap: "break-word",
                          }}
                        >
                          {r?.chat?.includes("\n") ? (
                            (r?.chat?.split("\n") || []).map(
                              (mess, indexMess) => (
                                <div
                                  key={indexMess}
                                  className="text-chat"
                                  style={{ wordWrap: "break-word" }}
                                >
                                  {mess}
                                </div>
                              )
                            )
                          ) : (
                            <span
                              className="text-chat"
                              style={{ wordWrap: "break-word" }}
                            >
                              {r?.chat}
                            </span>
                          )}
                        </div>
                      ) : null}
                    </div>
                  )}
                />
              </div>
            ))}
            <div ref={messEndRef} />
          </div>
          {selectedFile ? (
            <div
              style={{
                width: "100%",
                height: 100,
                display: "flex",
                alignItems: "center",
                paddingLeft: 15,
                borderTop: "1px solid gray",
              }}
            >
              <div style={{ position: "relative" }}>
                <img
                  alt={URL.createObjectURL(selectedFile)}
                  src={URL.createObjectURL(selectedFile)}
                  style={{ width: 80, height: 80, objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: -4,
                    right: -4,
                    backgroundColor: "white",
                    width: 18,
                    height: 18,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 100,
                    border: "1px solid gray",
                    paddingBottom: 2,
                    cursor: "pointer",
                  }}
                  onClick={handleRemoveSelectFile}
                >
                  <SVG src={Icons.close} size={12} />
                </div>
              </div>
            </div>
          ) : null}

          <div
            style={{
              border: theme ? "1px solid gray" : "",
              borderTop: !selectedFile ? "1px solid gray" : "",
              display: "flex",
              alignItems: "center",
              backgroundColor: theme ? "#2b2b2b" : "",
            }}
          >
            <div className={`input-chat-box-custom ${theme ? "is-theme" : ""}`}>
              <textarea
                id="text-area"
                type="text"
                className={`input-chat ${theme ? "is-theme" : ""}`}
                onChange={(e) => {
                  setValueChat(e.target.value);
                }}
                placeholder="Nhập nội dung"
                value={valueChat}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (!e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }
                }}
                style={{
                  height: 40,
                  paddingTop: 10,
                  borderRadius: 0,
                  resize: "none",
                }}
                rows={2}
              ></textarea>
            </div>
            <div
              style={{ width: "7%", cursor: "pointer" }}
              onClick={onChooseFile}
            >
              <input
                type="file"
                ref={inputRef}
                onChange={handleSelectFile}
                style={{ display: "none" }}
                accept={"image/png, image/jpeg, image/jpg"}
              />
              <SVG src={Icons.attach} size={24} />
            </div>
            <div
              style={{ width: "7%", cursor: "pointer" }}
              onClick={() => {
                setOpenEmoji(!openEmoji);
              }}
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
