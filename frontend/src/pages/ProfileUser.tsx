import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { getUser } from "../redux/users/users.action";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../style/pages/Profile/Profile.User.scss";
import { parseISO, format } from "date-fns";
import { Link } from "react-router-dom";
import { fr } from "date-fns/locale";
import UPDATE_Articles from "../components/Articles/UPDATE_Articles";
import DELETE_Articles from "../components/Articles/DELETE_Articles";
import { UUID } from "crypto";
import Popup from "./components/popupPostProfile";

function ProfileUser() {
    const { userId } = useParams();
    const dispatch = useDispatch<Dispatch<any>>();
    const user = useSelector((state: any) => state.userReducer.user);

    const profile = useSelector((state: any) => state.profileReducer.profile);
    const profileArticles = useSelector(
        (state: any) => state.profileReducer.profile?.articles
    );

    const [articles, setArticles] = useState(profileArticles);
    useEffect(() => {
        if (profile && profile.articles) {
            setArticles(profile.articles);
        }
    }, [profile]);

    const handleDeleteArticle = (deletedArticleId: UUID) => {
        setArticles((prevArticles: any) =>
            prevArticles.filter(
                (article: any) => article.id !== deletedArticleId
            )
        );
    };

    function formatDateProfile(date: string) {
        const originalDate = date;
        const parsedDate = parseISO(originalDate);
        const formattedDate = format(parsedDate, "dd MMMM yyyy à HH:mm", {
            locale: fr,
        });
        return formattedDate;
    }

    function formatDatePost(date: string) {
        const originalDate = date;
        const parsedDate = parseISO(originalDate);
        const formattedDate = format(parsedDate, "dd MMMM yyyy", {
            locale: fr,
        });
        return formattedDate;
    }
    const [index, setIndex] = useState(0);

    const [dataChildrenArticles, setDataChildrenArticles] = useState<any>({});

    const dataChildren = (data: any) => {
        setIndex(data.index);
        const dataArticles = {
            blur: true,
            isOpen: true,
            article_id: data.article_id,
        };

        setDataChildrenArticles(dataArticles);
    };
    useEffect(() => {
        if (userId) {
            dispatch(getUser(userId));
        }
    }, [userId]);
    return (
        <>
            <div className="container-profile-user">
                {profile && (
                    <>
                        <div className="back">
                            <Link to="/">
                                
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2.5}
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                                        />
                                    </svg>
                               
                            </Link>{" "}
                            <h1>{profile.username}</h1>
                        </div>
                        <div className="container-background"></div>
                        <div className="container">
                            <div className="container-avatar">
                                <div className="block-avatar">
                                    <img
                                        className="avatar"
                                        src={profile.avatar}
                                        alt="avatar"
                                    />
                                </div>
                                <div className="block-follow">
                                    <button className="follow">Suivre</button>
                                </div>
                            </div>
                            <div className="container-infos-profile">
                                <h2 className="username">{profile.username}</h2>
                                <p className="email">{profile.email}</p>
                                <p className="bio">{profile.bio}</p>
                                <p className="date">
                                    À rejoint le{" "}
                                    {profile?.createdAt
                                        ? formatDateProfile(profile.createdAt)
                                        : "Date non disponible"}
                                </p>
                            </div>
                            <h2 className="title">Posts</h2>
                            <div className="container-posts-profile">
                                {articles &&
                                    articles.map(
                                        (article: any, index: number) => (
                                            <div
                                                key={index}
                                                className="container-posts"
                                            >
                                                <div className="block-post">
                                                    <div className="block-post-author">
                                                        <img
                                                            src={
                                                                article.user
                                                                    .avatar
                                                            }
                                                            alt=""
                                                        />

                                                        <p className="post-date">
                                                            <span className="author">
                                                                {
                                                                    article.user
                                                                        .username
                                                                }
                                                            </span>{" "}
                                                            ·{" "}
                                                            <span className="date">
                                                                {formatDatePost(
                                                                    article.createdAt
                                                                )}
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <div className="block-post-content">
                                                        <h3 className="post-title">
                                                            {article.title}
                                                        </h3>
                                                        <p className="post-description">
                                                            {article.content}
                                                        </p>
                                                    </div>
                                                    {/* <div className="block-post-image">
                                                <img
                                                    className="post-image"
                                                    src="https://picsum.photos/200/300"
                                                    alt="post"
                                                />
                                            </div> */}
                                                    {article.user &&
                                                        (user.id ===
                                                            article.user.id ||
                                                            user.role ===
                                                                "admin") && (
                                                            <div className="block-post-buttons">
                                                                <UPDATE_Articles
                                                                    propsParent={
                                                                        article.id
                                                                    }
                                                                    onPopupOpenChange={
                                                                        dataChildren
                                                                    }
                                                                    index={
                                                                        index
                                                                    }
                                                                />
                                                                <DELETE_Articles
                                                                    propsParent={
                                                                        article.id
                                                                    }
                                                                    onDelete={
                                                                        handleDeleteArticle
                                                                    }
                                                                />
                                                            </div>
                                                        )}
                                                </div>
                                            </div>
                                        )
                                    )}
                            </div>
                        </div>
                    </>
                )}
            </div>
            <Popup index={index} dataChildrenArticles={dataChildrenArticles} />
        </>
    );
}

export default ProfileUser;
