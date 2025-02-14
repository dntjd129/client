import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../../../components/mainPage/Navbar";
import Footer from "../../../components/mainPage/Footer";
import "../MainPage.css";
import * as S from "../../../styles/mainPage/mypage.style";
import getAccessToken from "../../../hooks/getAcessToken";
import MyPageInfo from "./MyPageInfo";
import WishList from "./WishList";
import MyPageMain from "./MyPageMain";
import DeliveryList from "./DeliveryList";
import ModifyPw from "./ModifyPw";

function MyPage() {
  const navigate = useNavigate();
  const { isAdmin, accessToken } = useSelector((state) => state.user);
  const [orderList, setOrderList] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        console.log("try중입니다");

        const headers = getAccessToken();
        const res = await axios.get("/api/mypage", {
          headers,
        });
        if (res.data.orderList) {
          console.log("mypage: ", res.data);
          const { orderList, userName } = res.data;
          console.log(orderList, userName);
          setOrderList(orderList);
          setUserName(userName.userName);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error(error);
        navigate("/");
      }
    };
    getData();
  }, [navigate ]);

  return (
    <>
      <Navbar />
      <section>
        <S.MypageTitle>
          <Link to="/mypage">마이 페이지</Link>
          <S.InfoBox>환영합니다. {userName} 님 !</S.InfoBox>
        </S.MypageTitle>
        <S.MypageLayout>
          <S.SideMenu>
            <h3>
              <Link to="/mypage">mypage</Link>
            </h3>
            <ul>
              <li>
                <Link to="delivery">주문 목록</Link>
              </li>
              <li>
                <Link to="/cart">
                  <a>장바구니</a>
                </Link>
              </li>
              <li>
                <Link to="wishList">
                  <a>위시리스트</a>
                </Link>
              </li>
              <li>
                <Link to="info">
                  <a>내 정보 수정</a>
                </Link>
              </li>
              <li>
                <Link to="modifypw">
                  <a>비밀번호 변경</a>
                </Link>
              </li>
            </ul>
          </S.SideMenu>
          <S.MypageContent>
            <Routes>
              <Route path="/" element={<MyPageMain />} />
              <Route path="delivery" element={<DeliveryList />} />
              <Route path="info" element={<MyPageInfo />} />
              <Route path="wishlist" element={<WishList />} />
              <Route path="modifypw" element={<ModifyPw />} />
            </Routes>
          </S.MypageContent>
        </S.MypageLayout>
      </section>
      <Footer />
    </>
  );
}

export default MyPage;
