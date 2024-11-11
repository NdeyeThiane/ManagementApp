PGDMP     0                
    |            managementapp    15.8 (Homebrew)    15.8 (Homebrew) E    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16567    managementapp    DATABASE     o   CREATE DATABASE managementapp WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';
    DROP DATABASE managementapp;
                tpl822_6    false            T           1247    16767 	   user_role    TYPE     E   CREATE TYPE public.user_role AS ENUM (
    'student',
    'admin'
);
    DROP TYPE public.user_role;
       public          tpl822_6    false            �            1259    16805    coursecontent    TABLE       CREATE TABLE public.coursecontent (
    contentid integer NOT NULL,
    moduleid integer,
    contenttype character varying(50) NOT NULL,
    contenttitle character varying(100),
    contenturl text,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
 !   DROP TABLE public.coursecontent;
       public         heap    tpl822_6    false            �            1259    16804    coursecontent_contentid_seq    SEQUENCE     �   CREATE SEQUENCE public.coursecontent_contentid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.coursecontent_contentid_seq;
       public          tpl822_6    false    221            �           0    0    coursecontent_contentid_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.coursecontent_contentid_seq OWNED BY public.coursecontent.contentid;
          public          tpl822_6    false    220            �            1259    16782    courses    TABLE     �   CREATE TABLE public.courses (
    courseid integer NOT NULL,
    coursename character varying(100) NOT NULL,
    description text,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.courses;
       public         heap    tpl822_6    false            �            1259    16781    courses_courseid_seq    SEQUENCE     �   CREATE SEQUENCE public.courses_courseid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.courses_courseid_seq;
       public          tpl822_6    false    217            �           0    0    courses_courseid_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.courses_courseid_seq OWNED BY public.courses.courseid;
          public          tpl822_6    false    216            �            1259    16853    enrollments    TABLE     �   CREATE TABLE public.enrollments (
    enrollmentid integer NOT NULL,
    userid integer,
    courseid integer,
    enrollmentdate timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.enrollments;
       public         heap    tpl822_6    false            �            1259    16852    enrollments_enrollmentid_seq    SEQUENCE     �   CREATE SEQUENCE public.enrollments_enrollmentid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.enrollments_enrollmentid_seq;
       public          tpl822_6    false    227            �           0    0    enrollments_enrollmentid_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.enrollments_enrollmentid_seq OWNED BY public.enrollments.enrollmentid;
          public          tpl822_6    false    226            �            1259    16871    invitations    TABLE       CREATE TABLE public.invitations (
    invitationid integer NOT NULL,
    email character varying(100) NOT NULL,
    token character varying(255) NOT NULL,
    expires_at timestamp without time zone NOT NULL,
    used boolean DEFAULT false,
    role character varying(50)
);
    DROP TABLE public.invitations;
       public         heap    tpl822_6    false            �            1259    16870    invitations_invitationid_seq    SEQUENCE     �   CREATE SEQUENCE public.invitations_invitationid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.invitations_invitationid_seq;
       public          tpl822_6    false    229            �           0    0    invitations_invitationid_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.invitations_invitationid_seq OWNED BY public.invitations.invitationid;
          public          tpl822_6    false    228            �            1259    16792    modules    TABLE     �   CREATE TABLE public.modules (
    moduleid integer NOT NULL,
    courseid integer,
    modulename character varying(100) NOT NULL,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.modules;
       public         heap    tpl822_6    false            �            1259    16791    modules_moduleid_seq    SEQUENCE     �   CREATE SEQUENCE public.modules_moduleid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.modules_moduleid_seq;
       public          tpl822_6    false    219            �           0    0    modules_moduleid_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.modules_moduleid_seq OWNED BY public.modules.moduleid;
          public          tpl822_6    false    218            �            1259    16820    quizzes    TABLE     �   CREATE TABLE public.quizzes (
    quizid integer NOT NULL,
    moduleid integer,
    quizname character varying(100) NOT NULL,
    description text,
    totalmarks integer NOT NULL,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.quizzes;
       public         heap    tpl822_6    false            �            1259    16819    quizzes_quizid_seq    SEQUENCE     �   CREATE SEQUENCE public.quizzes_quizid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.quizzes_quizid_seq;
       public          tpl822_6    false    223            �           0    0    quizzes_quizid_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.quizzes_quizid_seq OWNED BY public.quizzes.quizid;
          public          tpl822_6    false    222            �            1259    16835    results    TABLE     �   CREATE TABLE public.results (
    resultid integer NOT NULL,
    userid integer,
    quizid integer,
    score integer,
    completiondate timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.results;
       public         heap    tpl822_6    false            �            1259    16834    results_resultid_seq    SEQUENCE     �   CREATE SEQUENCE public.results_resultid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.results_resultid_seq;
       public          tpl822_6    false    225            �           0    0    results_resultid_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.results_resultid_seq OWNED BY public.results.resultid;
          public          tpl822_6    false    224            �            1259    16772    users    TABLE     +  CREATE TABLE public.users (
    userid integer NOT NULL,
    username character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    role public.user_role NOT NULL,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.users;
       public         heap    tpl822_6    false    852            �            1259    16771    users_userid_seq    SEQUENCE     �   CREATE SEQUENCE public.users_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.users_userid_seq;
       public          tpl822_6    false    215            �           0    0    users_userid_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.users_userid_seq OWNED BY public.users.userid;
          public          tpl822_6    false    214            �           2604    16808    coursecontent contentid    DEFAULT     �   ALTER TABLE ONLY public.coursecontent ALTER COLUMN contentid SET DEFAULT nextval('public.coursecontent_contentid_seq'::regclass);
 F   ALTER TABLE public.coursecontent ALTER COLUMN contentid DROP DEFAULT;
       public          tpl822_6    false    221    220    221            �           2604    16785    courses courseid    DEFAULT     t   ALTER TABLE ONLY public.courses ALTER COLUMN courseid SET DEFAULT nextval('public.courses_courseid_seq'::regclass);
 ?   ALTER TABLE public.courses ALTER COLUMN courseid DROP DEFAULT;
       public          tpl822_6    false    216    217    217            �           2604    16856    enrollments enrollmentid    DEFAULT     �   ALTER TABLE ONLY public.enrollments ALTER COLUMN enrollmentid SET DEFAULT nextval('public.enrollments_enrollmentid_seq'::regclass);
 G   ALTER TABLE public.enrollments ALTER COLUMN enrollmentid DROP DEFAULT;
       public          tpl822_6    false    226    227    227            �           2604    16874    invitations invitationid    DEFAULT     �   ALTER TABLE ONLY public.invitations ALTER COLUMN invitationid SET DEFAULT nextval('public.invitations_invitationid_seq'::regclass);
 G   ALTER TABLE public.invitations ALTER COLUMN invitationid DROP DEFAULT;
       public          tpl822_6    false    229    228    229            �           2604    16795    modules moduleid    DEFAULT     t   ALTER TABLE ONLY public.modules ALTER COLUMN moduleid SET DEFAULT nextval('public.modules_moduleid_seq'::regclass);
 ?   ALTER TABLE public.modules ALTER COLUMN moduleid DROP DEFAULT;
       public          tpl822_6    false    219    218    219            �           2604    16823    quizzes quizid    DEFAULT     p   ALTER TABLE ONLY public.quizzes ALTER COLUMN quizid SET DEFAULT nextval('public.quizzes_quizid_seq'::regclass);
 =   ALTER TABLE public.quizzes ALTER COLUMN quizid DROP DEFAULT;
       public          tpl822_6    false    222    223    223            �           2604    16838    results resultid    DEFAULT     t   ALTER TABLE ONLY public.results ALTER COLUMN resultid SET DEFAULT nextval('public.results_resultid_seq'::regclass);
 ?   ALTER TABLE public.results ALTER COLUMN resultid DROP DEFAULT;
       public          tpl822_6    false    224    225    225            �           2604    16775    users userid    DEFAULT     l   ALTER TABLE ONLY public.users ALTER COLUMN userid SET DEFAULT nextval('public.users_userid_seq'::regclass);
 ;   ALTER TABLE public.users ALTER COLUMN userid DROP DEFAULT;
       public          tpl822_6    false    215    214    215            �          0    16805    coursecontent 
   TABLE DATA           n   COPY public.coursecontent (contentid, moduleid, contenttype, contenttitle, contenturl, createdat) FROM stdin;
    public          tpl822_6    false    221   �Q       �          0    16782    courses 
   TABLE DATA           O   COPY public.courses (courseid, coursename, description, createdat) FROM stdin;
    public          tpl822_6    false    217   �Q       �          0    16853    enrollments 
   TABLE DATA           U   COPY public.enrollments (enrollmentid, userid, courseid, enrollmentdate) FROM stdin;
    public          tpl822_6    false    227   �Q       �          0    16871    invitations 
   TABLE DATA           Y   COPY public.invitations (invitationid, email, token, expires_at, used, role) FROM stdin;
    public          tpl822_6    false    229   R       �          0    16792    modules 
   TABLE DATA           L   COPY public.modules (moduleid, courseid, modulename, createdat) FROM stdin;
    public          tpl822_6    false    219   �R       �          0    16820    quizzes 
   TABLE DATA           a   COPY public.quizzes (quizid, moduleid, quizname, description, totalmarks, createdat) FROM stdin;
    public          tpl822_6    false    223   �R       �          0    16835    results 
   TABLE DATA           R   COPY public.results (resultid, userid, quizid, score, completiondate) FROM stdin;
    public          tpl822_6    false    225   S       �          0    16772    users 
   TABLE DATA           S   COPY public.users (userid, username, email, password, role, createdat) FROM stdin;
    public          tpl822_6    false    215   /S       �           0    0    coursecontent_contentid_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.coursecontent_contentid_seq', 1, false);
          public          tpl822_6    false    220            �           0    0    courses_courseid_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.courses_courseid_seq', 1, false);
          public          tpl822_6    false    216            �           0    0    enrollments_enrollmentid_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.enrollments_enrollmentid_seq', 1, false);
          public          tpl822_6    false    226            �           0    0    invitations_invitationid_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.invitations_invitationid_seq', 3, true);
          public          tpl822_6    false    228            �           0    0    modules_moduleid_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.modules_moduleid_seq', 1, false);
          public          tpl822_6    false    218            �           0    0    quizzes_quizid_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.quizzes_quizid_seq', 1, false);
          public          tpl822_6    false    222            �           0    0    results_resultid_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.results_resultid_seq', 1, false);
          public          tpl822_6    false    224            �           0    0    users_userid_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.users_userid_seq', 1, true);
          public          tpl822_6    false    214            �           2606    16813     coursecontent coursecontent_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public.coursecontent
    ADD CONSTRAINT coursecontent_pkey PRIMARY KEY (contentid);
 J   ALTER TABLE ONLY public.coursecontent DROP CONSTRAINT coursecontent_pkey;
       public            tpl822_6    false    221            �           2606    16790    courses courses_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (courseid);
 >   ALTER TABLE ONLY public.courses DROP CONSTRAINT courses_pkey;
       public            tpl822_6    false    217            �           2606    16859    enrollments enrollments_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT enrollments_pkey PRIMARY KEY (enrollmentid);
 F   ALTER TABLE ONLY public.enrollments DROP CONSTRAINT enrollments_pkey;
       public            tpl822_6    false    227            �           2606    16877    invitations invitations_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.invitations
    ADD CONSTRAINT invitations_pkey PRIMARY KEY (invitationid);
 F   ALTER TABLE ONLY public.invitations DROP CONSTRAINT invitations_pkey;
       public            tpl822_6    false    229            �           2606    16798    modules modules_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.modules
    ADD CONSTRAINT modules_pkey PRIMARY KEY (moduleid);
 >   ALTER TABLE ONLY public.modules DROP CONSTRAINT modules_pkey;
       public            tpl822_6    false    219            �           2606    16828    quizzes quizzes_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT quizzes_pkey PRIMARY KEY (quizid);
 >   ALTER TABLE ONLY public.quizzes DROP CONSTRAINT quizzes_pkey;
       public            tpl822_6    false    223            �           2606    16841    results results_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.results
    ADD CONSTRAINT results_pkey PRIMARY KEY (resultid);
 >   ALTER TABLE ONLY public.results DROP CONSTRAINT results_pkey;
       public            tpl822_6    false    225            �           2606    16780    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            tpl822_6    false    215            �           2606    16778    users users_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            tpl822_6    false    215            �           2606    16814 )   coursecontent coursecontent_moduleid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.coursecontent
    ADD CONSTRAINT coursecontent_moduleid_fkey FOREIGN KEY (moduleid) REFERENCES public.modules(moduleid);
 S   ALTER TABLE ONLY public.coursecontent DROP CONSTRAINT coursecontent_moduleid_fkey;
       public          tpl822_6    false    3568    219    221                        2606    16865 %   enrollments enrollments_courseid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT enrollments_courseid_fkey FOREIGN KEY (courseid) REFERENCES public.courses(courseid);
 O   ALTER TABLE ONLY public.enrollments DROP CONSTRAINT enrollments_courseid_fkey;
       public          tpl822_6    false    227    3566    217                       2606    16860 #   enrollments enrollments_userid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT enrollments_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(userid);
 M   ALTER TABLE ONLY public.enrollments DROP CONSTRAINT enrollments_userid_fkey;
       public          tpl822_6    false    227    215    3564            �           2606    16799    modules modules_courseid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.modules
    ADD CONSTRAINT modules_courseid_fkey FOREIGN KEY (courseid) REFERENCES public.courses(courseid);
 G   ALTER TABLE ONLY public.modules DROP CONSTRAINT modules_courseid_fkey;
       public          tpl822_6    false    3566    219    217            �           2606    16829    quizzes quizzes_moduleid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT quizzes_moduleid_fkey FOREIGN KEY (moduleid) REFERENCES public.modules(moduleid);
 G   ALTER TABLE ONLY public.quizzes DROP CONSTRAINT quizzes_moduleid_fkey;
       public          tpl822_6    false    3568    223    219            �           2606    16847    results results_quizid_fkey    FK CONSTRAINT        ALTER TABLE ONLY public.results
    ADD CONSTRAINT results_quizid_fkey FOREIGN KEY (quizid) REFERENCES public.quizzes(quizid);
 E   ALTER TABLE ONLY public.results DROP CONSTRAINT results_quizid_fkey;
       public          tpl822_6    false    223    225    3572            �           2606    16842    results results_userid_fkey    FK CONSTRAINT     }   ALTER TABLE ONLY public.results
    ADD CONSTRAINT results_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(userid);
 E   ALTER TABLE ONLY public.results DROP CONSTRAINT results_userid_fkey;
       public          tpl822_6    false    225    3564    215            �      x������ � �      �      x������ � �      �      x������ � �      �   �   x�uϻm1Eј[��b~��0r�@	���u :p�"��P�λ�����ǭ����^n�k���.fUYL-��J
@�Չ#iG+��zB����(���e�0�1^��d#�<:ρ>E�fn��i7 ���bf��kb����p�hfUU�ʉm����JP]�#b,���)G�,�R��c|7?�r]�ey�MK      �      x������ � �      �      x������ � �      �      x������ � �      �   �   x�3��KI��%F&鹉�9z����*FI*�*�A��N�)N�NA����E)�%!�~E�e��&.>���9�y>YU����9!~Μ�)��y�FF&����f
�&V��V��z�f��FF\1z\\\ �n$�     