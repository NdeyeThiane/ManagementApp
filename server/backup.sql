

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;



CREATE TYPE public.user_role AS ENUM (
    'student',
    'admin'
);


ALTER TYPE public.user_role OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;



CREATE TABLE public.coursecontent (
    contentid integer NOT NULL,
    moduleid integer,
    contenttype character varying(50) NOT NULL,
    contenttitle character varying(100),
    contenturl text,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.coursecontent OWNER TO postgres;



CREATE SEQUENCE public.coursecontent_contentid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.coursecontent_contentid_seq OWNER postgres;


ALTER SEQUENCE public.coursecontent_contentid_seq OWNED BY public.coursecontent.contentid;




CREATE TABLE public.courses (
    courseid integer NOT NULL,
    coursename character varying(100) NOT NULL,
    description text,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.courses OWNER postgres;



CREATE SEQUENCE public.courses_courseid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.courses_courseid_seq OWNER postgres;


ALTER SEQUENCE public.courses_courseid_seq OWNED BY public.courses.courseid;



CREATE TABLE public.enrollments (
    enrollmentid integer NOT NULL,
    userid integer,
    courseid integer,
    enrollmentdate timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.enrollments OWNER postgres;



CREATE SEQUENCE public.enrollments_enrollmentid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.enrollments_enrollmentid_seq OWNER postgres;



ALTER SEQUENCE public.enrollments_enrollmentid_seq OWNED BY public.enrollments.enrollmentid;




CREATE TABLE public.invitations (
    invitationid integer NOT NULL,
    email character varying(100) NOT NULL,
    token character varying(255) NOT NULL,
    expires_at timestamp without time zone NOT NULL,
    used boolean DEFAULT false,
    role character varying(50)
);


ALTER TABLE public.invitations OWNER postgres;



CREATE SEQUENCE public.invitations_invitationid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.invitations_invitationid_seq OWNER postgres;



ALTER SEQUENCE public.invitations_invitationid_seq OWNED BY public.invitations.invitationid;




CREATE TABLE public.modules (
    moduleid integer NOT NULL,
    courseid integer,
    modulename character varying(100) NOT NULL,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.modules OWNER postgres;



CREATE SEQUENCE public.modules_moduleid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.modules_moduleid_seq OWNER postgres;



ALTER SEQUENCE public.modules_moduleid_seq OWNED BY public.modules.moduleid;




CREATE TABLE public.quizzes (
    quizid integer NOT NULL,
    moduleid integer,
    quizname character varying(100) NOT NULL,
    description text,
    totalmarks integer NOT NULL,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.quizzes OWNER postgres;



CREATE SEQUENCE public.quizzes_quizid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.quizzes_quizid_seq OWNER postgres;



ALTER SEQUENCE public.quizzes_quizid_seq OWNED BY public.quizzes.quizid;



CREATE TABLE public.results (
    resultid integer NOT NULL,
    userid integer,
    quizid integer,
    score integer,
    completiondate timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.results OWNER postgres;



CREATE SEQUENCE public.results_resultid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.results_resultid_seq OWNER postgres;



ALTER SEQUENCE public.results_resultid_seq OWNED BY public.results.resultid;



CREATE TABLE public.users (
    userid integer NOT NULL,
    username character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    role public.user_role NOT NULL,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER postgres;



CREATE SEQUENCE public.users_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_userid_seq OWNER postgres;



ALTER SEQUENCE public.users_userid_seq OWNED BY public.users.userid;




ALTER TABLE ONLY public.coursecontent ALTER COLUMN contentid SET DEFAULT nextval('public.coursecontent_contentid_seq'::regclass);




ALTER TABLE ONLY public.courses ALTER COLUMN courseid SET DEFAULT nextval('public.courses_courseid_seq'::regclass);


--
-- Name: enrollments enrollmentid; Type: DEFAULT; Schema: public; Ownepostgres
--

ALTER TABLE ONLY public.enrollments ALTER COLUMN enrollmentid SET DEFAULT nextval('public.enrollments_enrollmentid_seq'::regclass);


--
-- Name: invitations invitationid; Type: DEFAULT; Schema: public; Ownepostgres
--

ALTER TABLE ONLY public.invitations ALTER COLUMN invitationid SET DEFAULT nextval('public.invitations_invitationid_seq'::regclass);


--
-- Name: modules moduleid; Type: DEFAULT; Schema: public; Ownepostgres
--

ALTER TABLE ONLY public.modules ALTER COLUMN moduleid SET DEFAULT nextval('public.modules_moduleid_seq'::regclass);


--
-- Name: quizzes quizid; Type: DEFAULT; Schema: public; Ownepostgres
--

ALTER TABLE ONLY public.quizzes ALTER COLUMN quizid SET DEFAULT nextval('public.quizzes_quizid_seq'::regclass);


--
-- Name: results resultid; Type: DEFAULT; Schema: public; Ownepostgres
--

ALTER TABLE ONLY public.results ALTER COLUMN resultid SET DEFAULT nextval('public.results_resultid_seq'::regclass);


--
-- Name: users userid; Type: DEFAULT; Schema: public; Ownepostgres
--

ALTER TABLE ONLY public.users ALTER COLUMN userid SET DEFAULT nextval('public.users_userid_seq'::regclass);


--
-- Data for Name: coursecontent; Type: TABLE DATA; Schema: public; Ownepostgres
--

COPY public.coursecontent (contentid, moduleid, contenttype, contenttitle, contenturl, createdat) FROM stdin;
\.


--
-- Data for Name: courses; Type: TABLE DATA; Schema: public; Ownepostgres
--

COPY public.courses (courseid, coursename, description, createdat) FROM stdin;
3	Intro to Javascript	lets learn javascript	2024-11-08 16:55:58.785794
5	java	\N	2024-11-09 13:09:17.75881
\.


--
-- Data for Name: enrollments; Type: TABLE DATA; Schema: public; Ownepostgres
--

COPY public.enrollments (enrollmentid, userid, courseid, enrollmentdate) FROM stdin;
\.


--
-- Data for Name: invitations; Type: TABLE DATA; Schema: public; Ownepostgres
--

COPY public.invitations (invitationid, email, token, expires_at, used, role) FROM stdin;
1	ndeyethiane15@gmail.com	23f499d177349796446c2700293ce23527f19ad0	2024-11-07 13:45:40.714	f	\N
2	test15@gmail.com	6f11704829b40e5e3734fe2300d9e9be5352d022	2024-11-08 11:32:33.633	f	\N
3	ndeyethiane15@gmail.com	982ad0c77e9c3639bf4f3923fc20ce71e5115aaa	2024-11-08 16:59:34.725	f	student
4	ndeyethiane15@gamil.com	9075826ac7ad9de1d18b718b9052815ca09de2d3	2024-11-10 15:09:50.977	f	student
5	ndeyethiane15@gmail.com	c5a11321c5867b2901ac5abe0846fadd752a920e	2024-11-10 15:22:21.088	f	student
6	ndeyethiane15@gmail.com	e9d3fcf7c9a72eb8c917ff9f6fe741f678215543	2024-11-10 15:29:01.172	f	student
\.


--
-- Data for Name: modules; Type: TABLE DATA; Schema: public; Ownepostgres
--

COPY public.modules (moduleid, courseid, modulename, createdat) FROM stdin;
\.


--
-- Data for Name: quizzes; Type: TABLE DATA; Schema: public; Ownepostgres
--

COPY public.quizzes (quizid, moduleid, quizname, description, totalmarks, createdat) FROM stdin;
\.


--
-- Data for Name: results; Type: TABLE DATA; Schema: public; Ownepostgres
--

COPY public.results (resultid, userid, quizid, score, completiondate) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Ownepostgres
--

COPY public.users (userid, username, email, password, role, createdat) FROM stdin;
1	ndeye	ndeyet2004@gmail.com	$2b$10$hSRuKBYdBIBRIIEArdytTONrhgvIpG4DLoUAlqnLpjzWMH5MulTNC	admin	2024-11-06 14:55:17.561922
\.


--
-- Name: coursecontent_contentid_seq; Type: SEQUENCE SET; Schema: public; Ownepostgres
--

SELECT pg_catalog.setval('public.coursecontent_contentid_seq', 1, false);


--
-- Name: courses_courseid_seq; Type: SEQUENCE SET; Schema: public; Ownepostgres
--

SELECT pg_catalog.setval('public.courses_courseid_seq', 5, true);


--
-- Name: enrollments_enrollmentid_seq; Type: SEQUENCE SET; Schema: public; Ownepostgres
--

SELECT pg_catalog.setval('public.enrollments_enrollmentid_seq', 1, false);


--
-- Name: invitations_invitationid_seq; Type: SEQUENCE SET; Schema: public; Ownepostgres
--

SELECT pg_catalog.setval('public.invitations_invitationid_seq', 6, true);


--
-- Name: modules_moduleid_seq; Type: SEQUENCE SET; Schema: public; Ownepostgres
--

SELECT pg_catalog.setval('public.modules_moduleid_seq', 2, true);


--
-- Name: quizzes_quizid_seq; Type: SEQUENCE SET; Schema: public; Ownepostgres
--

SELECT pg_catalog.setval('public.quizzes_quizid_seq', 1, false);


--
-- Name: results_resultid_seq; Type: SEQUENCE SET; Schema: public; Ownepostgres
--

SELECT pg_catalog.setval('public.results_resultid_seq', 1, false);


--
-- Name: users_userid_seq; Type: SEQUENCE SET; Schema: public; Ownepostgres
--

SELECT pg_catalog.setval('public.users_userid_seq', 1, true);


--
-- Name: coursecontent coursecontent_pkey; Type: CONSTRAINT; Schema: public; Ownepostgres
--

ALTER TABLE ONLY public.coursecontent
    ADD CONSTRAINT coursecontent_pkey PRIMARY KEY (contentid);


--
-- Name: courses courses_pkey; Type: CONSTRAINT; Schema: public; Ownepostgres
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (courseid);


--
-- Name: enrollments enrollments_pkey; Type: CONSTRAINT; Schema: public; Ownepostgres
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT enrollments_pkey PRIMARY KEY (enrollmentid);


--
-- Name: invitations invitations_pkey; Type: CONSTRAINT; Schema: public; Ownepostgres
--

ALTER TABLE ONLY public.invitations
    ADD CONSTRAINT invitations_pkey PRIMARY KEY (invitationid);


--
-- Name: modules modules_pkey; Type: CONSTRAINT; Schema: public; Ownepostgres
--

ALTER TABLE ONLY public.modules
    ADD CONSTRAINT modules_pkey PRIMARY KEY (moduleid);


--
-- Name: quizzes quizzes_pkey; Type: CONSTRAINT; Schema: public; Ownepostgres
--

ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT quizzes_pkey PRIMARY KEY (quizid);


--
-- Name: results results_pkey; Type: CONSTRAINT; Schema: public; Ownepostgres
--

ALTER TABLE ONLY public.results
    ADD CONSTRAINT results_pkey PRIMARY KEY (resultid);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Ownepostgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Ownepostgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);


--
-- Name: coursecontent coursecontent_moduleid_fkey; Type: FK CONSTRAINT; Schema: public; Ownepostgres
--

ALTER TABLE ONLY public.coursecontent
    ADD CONSTRAINT coursecontent_moduleid_fkey FOREIGN KEY (moduleid) REFERENCES public.modules(moduleid);


--
-- Name: enrollments enrollments_courseid_fkey; Type: FK CONSTRAINT; Schema: public; Ownepostgres
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT enrollments_courseid_fkey FOREIGN KEY (courseid) REFERENCES public.courses(courseid);


--
-- Name: enrollments enrollments_userid_fkey; Type: FK CONSTRAINT; Schema: public; Ownepostgres
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT enrollments_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(userid);


--
-- Name: modules modules_courseid_fkey; Type: FK CONSTRAINT; Schema: public; Ownepostgres
--

ALTER TABLE ONLY public.modules
    ADD CONSTRAINT modules_courseid_fkey FOREIGN KEY (courseid) REFERENCES public.courses(courseid);


--
-- Name: quizzes quizzes_moduleid_fkey; Type: FK CONSTRAINT; Schema: public; Ownepostgres
--

ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT quizzes_moduleid_fkey FOREIGN KEY (moduleid) REFERENCES public.modules(moduleid);


--
-- Name: results results_quizid_fkey; Type: FK CONSTRAINT; Schema: public; Ownepostgres
--

ALTER TABLE ONLY public.results
    ADD CONSTRAINT results_quizid_fkey FOREIGN KEY (quizid) REFERENCES public.quizzes(quizid);


--
-- Name: results results_userid_fkey; Type: FK CONSTRAINT; Schema: public; Ownepostgres
--

ALTER TABLE ONLY public.results
    ADD CONSTRAINT results_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(userid);


--
-- PostgreSQL database dump complete
--

