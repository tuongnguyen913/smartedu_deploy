--
-- PostgreSQL database dump
--

\restrict EVJgCLP54J08RKABAX40RmI9d1xDBT3qLu5bJjcAmEyUWhTtiICcSP9q4cU8xkb

-- Dumped from database version 18.6
-- Dumped by pg_dump version 18.6

-- Started on 2026-11-03 17:41:44

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5542 (class 1262 OID 33533)
-- Name: SmartEduDb; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "SmartEduDb" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';


ALTER DATABASE "SmartEduDb" OWNER TO postgres;

\unrestrict EVJgCLP54J08RKABAX40RmI9d1xDBT3qLu5bJjcAmEyUWhTtiICcSP9q4cU8xkb
\connect "SmartEduDb"
\restrict EVJgCLP54J08RKABAX40RmI9d1xDBT3qLu5bJjcAmEyUWhTtiICcSP9q4cU8xkb

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 33534)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 5543 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 33545)
-- Name: Albums; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Albums" (
    "Id" integer NOT NULL,
    "Name" character varying(255) NOT NULL,
    "Slug" character varying(255) NOT NULL,
    "Description" text,
    "CoverImage" character varying(500),
    "DisplayOrder" integer DEFAULT 0,
    "IsActive" boolean DEFAULT true,
    "CreatedDate" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."Albums" OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 33556)
-- Name: Albums_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Albums_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Albums_Id_seq" OWNER TO postgres;

--
-- TOC entry 5544 (class 0 OID 0)
-- Dependencies: 221
-- Name: Albums_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Albums_Id_seq" OWNED BY public."Albums"."Id";


--
-- TOC entry 222 (class 1259 OID 33557)
-- Name: Branches; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Branches" (
    "BranchId" integer NOT NULL,
    "BranchName" character varying(200) NOT NULL,
    "Address" character varying(300) NOT NULL,
    "Phone" character varying(50),
    "Hotline" character varying(50),
    "Email" character varying(100),
    "WorkingHours" character varying(200),
    "GoogleMapsEmbedUrl" character varying(1000),
    "GoogleMapsDirectionsUrl" character varying(1000),
    "Latitude" numeric(10,7),
    "Longitude" numeric(10,7),
    "ImageUrl" character varying(500),
    "DisplayOrder" integer DEFAULT 0,
    "IsActive" boolean DEFAULT true
);


ALTER TABLE public."Branches" OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 33567)
-- Name: Branches_BranchId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Branches_BranchId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Branches_BranchId_seq" OWNER TO postgres;

--
-- TOC entry 5545 (class 0 OID 0)
-- Dependencies: 223
-- Name: Branches_BranchId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Branches_BranchId_seq" OWNED BY public."Branches"."BranchId";


--
-- TOC entry 224 (class 1259 OID 33568)
-- Name: CategoryArticle; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CategoryArticle" (
    "CategoryId" integer NOT NULL,
    "Title" character varying(255) NOT NULL,
    "Description" text,
    "Userkey" character varying(255),
    "ParentId" integer,
    "DisplayOrder" integer DEFAULT 0,
    "Status" boolean DEFAULT true,
    "Picture" character varying(500),
    "SEOTitle" character varying(255),
    "SEODescription" character varying(500),
    "SEOKeyWord" character varying(255),
    "LanguageCode" character varying(10)
);


ALTER TABLE public."CategoryArticle" OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 33577)
-- Name: CategoryArticle_CategoryId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."CategoryArticle_CategoryId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."CategoryArticle_CategoryId_seq" OWNER TO postgres;

--
-- TOC entry 5546 (class 0 OID 0)
-- Dependencies: 225
-- Name: CategoryArticle_CategoryId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."CategoryArticle_CategoryId_seq" OWNED BY public."CategoryArticle"."CategoryId";


--
-- TOC entry 226 (class 1259 OID 33578)
-- Name: City; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."City" (
    "CityId" integer NOT NULL,
    "CityName" character varying(100) NOT NULL
);


ALTER TABLE public."City" OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 33583)
-- Name: City_CityId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."City_CityId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."City_CityId_seq" OWNER TO postgres;

--
-- TOC entry 5547 (class 0 OID 0)
-- Dependencies: 227
-- Name: City_CityId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."City_CityId_seq" OWNED BY public."City"."CityId";


--
-- TOC entry 228 (class 1259 OID 33584)
-- Name: ContactInfo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ContactInfo" (
    "Id" integer NOT NULL,
    "CompanyName" character varying(255),
    "Address" character varying(300),
    "Phone" character varying(50),
    "Hotline" character varying(50),
    "Email" character varying(100),
    "MapEmbed" text,
    "IsActive" boolean DEFAULT true
);


ALTER TABLE public."ContactInfo" OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 33591)
-- Name: ContactInfo_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ContactInfo_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ContactInfo_Id_seq" OWNER TO postgres;

--
-- TOC entry 5548 (class 0 OID 0)
-- Dependencies: 229
-- Name: ContactInfo_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ContactInfo_Id_seq" OWNED BY public."ContactInfo"."Id";


--
-- TOC entry 230 (class 1259 OID 33592)
-- Name: ContactMessages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ContactMessages" (
    "Id" integer NOT NULL,
    "FullName" character varying(200) NOT NULL,
    "Email" character varying(150) NOT NULL,
    "Subject" character varying(255),
    "PhoneNumber" character varying(50),
    "Address" character varying(300),
    "MessageText" text NOT NULL,
    "Status" character varying(50) DEFAULT 'New'::character varying,
    "CreatedAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."ContactMessages" OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 33603)
-- Name: ContactMessages_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ContactMessages_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ContactMessages_Id_seq" OWNER TO postgres;

--
-- TOC entry 5549 (class 0 OID 0)
-- Dependencies: 231
-- Name: ContactMessages_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ContactMessages_Id_seq" OWNED BY public."ContactMessages"."Id";


--
-- TOC entry 232 (class 1259 OID 33604)
-- Name: CourseSyllabus; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CourseSyllabus" (
    "SyllabusId" integer NOT NULL,
    "CourseId" integer NOT NULL,
    "SemesterName" character varying(100) NOT NULL,
    "TopicTitle" character varying(250) NOT NULL,
    "TopicContent" text,
    "DisplayOrder" integer DEFAULT 0
);


ALTER TABLE public."CourseSyllabus" OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 33614)
-- Name: CourseSyllabus_SyllabusId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."CourseSyllabus_SyllabusId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."CourseSyllabus_SyllabusId_seq" OWNER TO postgres;

--
-- TOC entry 5550 (class 0 OID 0)
-- Dependencies: 233
-- Name: CourseSyllabus_SyllabusId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."CourseSyllabus_SyllabusId_seq" OWNED BY public."CourseSyllabus"."SyllabusId";


--
-- TOC entry 234 (class 1259 OID 33615)
-- Name: Courses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Courses" (
    "CourseId" integer NOT NULL,
    "CourseName" character varying(250) NOT NULL,
    "Slug" character varying(250) NOT NULL,
    "GradeLevel" character varying(50) NOT NULL,
    "Grade" character varying(50),
    "Subject" character varying(100) NOT NULL,
    "ShortDescription" character varying(1000),
    "ContentHtml" text,
    "ThumbnailUrl" character varying(500),
    "BannerUrl" character varying(500),
    "PsychologyOverview" character varying(2000),
    "TargetKnowledge" character varying(1000),
    "TargetThinking" character varying(1000),
    "TargetSkills" character varying(1000),
    "TuitionFee" numeric(18,2),
    "TuitionPeriod" character varying(100),
    "ScheduleSummary" character varying(250),
    "ClassSizeMax" integer,
    "HasFreeTutoringGuarantee" boolean DEFAULT true,
    "HasTuitionRefundGuarantee" boolean DEFAULT true,
    "DisplayOrder" integer DEFAULT 0,
    "IsFeatured" boolean DEFAULT false,
    "IsActive" boolean DEFAULT true,
    "SeoTitle" character varying(250),
    "SeoDescription" character varying(500),
    "SeoKeywords" character varying(250),
    "CreatedDate" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "CreatedBy" character varying(100),
    "UpdatedDate" timestamp without time zone,
    "UpdatedBy" character varying(100)
);


ALTER TABLE public."Courses" OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 33631)
-- Name: Courses_CourseId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Courses_CourseId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Courses_CourseId_seq" OWNER TO postgres;

--
-- TOC entry 5551 (class 0 OID 0)
-- Dependencies: 235
-- Name: Courses_CourseId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Courses_CourseId_seq" OWNED BY public."Courses"."CourseId";


--
-- TOC entry 236 (class 1259 OID 33632)
-- Name: Dealership; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Dealership" (
    "DealershipId" integer NOT NULL,
    "Name" character varying(200) NOT NULL,
    "Address" character varying(300),
    "Phone" character varying(50),
    "DistrictId" integer,
    "IsActive" boolean DEFAULT true
);


ALTER TABLE public."Dealership" OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 33640)
-- Name: Dealership_DealershipId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Dealership_DealershipId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Dealership_DealershipId_seq" OWNER TO postgres;

--
-- TOC entry 5552 (class 0 OID 0)
-- Dependencies: 237
-- Name: Dealership_DealershipId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Dealership_DealershipId_seq" OWNED BY public."Dealership"."DealershipId";


--
-- TOC entry 238 (class 1259 OID 33641)
-- Name: District; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."District" (
    "DistrictId" integer NOT NULL,
    "CityId" integer NOT NULL,
    "DistrictName" character varying(100) NOT NULL
);


ALTER TABLE public."District" OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 33647)
-- Name: District_DistrictId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."District_DistrictId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."District_DistrictId_seq" OWNER TO postgres;

--
-- TOC entry 5553 (class 0 OID 0)
-- Dependencies: 239
-- Name: District_DistrictId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."District_DistrictId_seq" OWNED BY public."District"."DistrictId";


--
-- TOC entry 240 (class 1259 OID 33648)
-- Name: Enrollments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Enrollments" (
    "EnrollmentId" integer NOT NULL,
    "ParentName" character varying(200) NOT NULL,
    "PhoneNumber" character varying(50) NOT NULL,
    "Email" character varying(150),
    "StudentName" character varying(200),
    "GradeLevel" character varying(50),
    "BranchId" integer,
    "CourseId" integer,
    "LearningNeed" character varying(500),
    "SourcePage" character varying(100),
    "Status" character varying(50) DEFAULT 'Pending'::character varying NOT NULL,
    "AdminNotes" character varying(1000),
    "CreatedDate" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "ProcessedDate" timestamp without time zone,
    "ProcessedBy" character varying(100)
);


ALTER TABLE public."Enrollments" OWNER TO postgres;

--
-- TOC entry 241 (class 1259 OID 33659)
-- Name: Enrollments_EnrollmentId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Enrollments_EnrollmentId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Enrollments_EnrollmentId_seq" OWNER TO postgres;

--
-- TOC entry 5554 (class 0 OID 0)
-- Dependencies: 241
-- Name: Enrollments_EnrollmentId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Enrollments_EnrollmentId_seq" OWNED BY public."Enrollments"."EnrollmentId";


--
-- TOC entry 242 (class 1259 OID 33660)
-- Name: ExtendedProperty; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ExtendedProperty" (
    "Id" integer NOT NULL,
    "ProductId" integer NOT NULL,
    "PropertyName" character varying(150) NOT NULL,
    "PropertyValue" text
);


ALTER TABLE public."ExtendedProperty" OWNER TO postgres;

--
-- TOC entry 243 (class 1259 OID 33668)
-- Name: ExtendedProperty_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ExtendedProperty_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ExtendedProperty_Id_seq" OWNER TO postgres;

--
-- TOC entry 5555 (class 0 OID 0)
-- Dependencies: 243
-- Name: ExtendedProperty_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ExtendedProperty_Id_seq" OWNED BY public."ExtendedProperty"."Id";


--
-- TOC entry 244 (class 1259 OID 33669)
-- Name: GalleryConfig; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."GalleryConfig" (
    "Id" integer NOT NULL,
    "GalleryName" character varying(200),
    "PrimaryColor" character varying(50),
    "SecondaryColor" character varying(50),
    "ItemsPerPage" integer DEFAULT 12,
    "IsActive" boolean DEFAULT true
);


ALTER TABLE public."GalleryConfig" OWNER TO postgres;

--
-- TOC entry 245 (class 1259 OID 33675)
-- Name: GalleryConfig_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."GalleryConfig_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."GalleryConfig_Id_seq" OWNER TO postgres;

--
-- TOC entry 5556 (class 0 OID 0)
-- Dependencies: 245
-- Name: GalleryConfig_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."GalleryConfig_Id_seq" OWNED BY public."GalleryConfig"."Id";


--
-- TOC entry 246 (class 1259 OID 33676)
-- Name: Logo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Logo" (
    "Id" integer NOT NULL,
    "LogoName" character varying(100),
    "LogoUrl" character varying(500) NOT NULL,
    "Width" integer,
    "Height" integer,
    "Position" character varying(50),
    "IsActive" boolean DEFAULT true
);


ALTER TABLE public."Logo" OWNER TO postgres;

--
-- TOC entry 247 (class 1259 OID 33684)
-- Name: Logo_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Logo_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Logo_Id_seq" OWNER TO postgres;

--
-- TOC entry 5557 (class 0 OID 0)
-- Dependencies: 247
-- Name: Logo_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Logo_Id_seq" OWNED BY public."Logo"."Id";


--
-- TOC entry 248 (class 1259 OID 33685)
-- Name: Medias; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Medias" (
    "Id" integer NOT NULL,
    "AlbumId" integer,
    "Name" character varying(255),
    "Url" character varying(500) NOT NULL,
    "MimeType" character varying(100),
    "FileSize" bigint,
    "DisplayOrder" integer DEFAULT 0,
    "IsActive" boolean DEFAULT true,
    "CreatedDate" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."Medias" OWNER TO postgres;

--
-- TOC entry 249 (class 1259 OID 33695)
-- Name: Medias_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Medias_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Medias_Id_seq" OWNER TO postgres;

--
-- TOC entry 5558 (class 0 OID 0)
-- Dependencies: 249
-- Name: Medias_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Medias_Id_seq" OWNED BY public."Medias"."Id";


--
-- TOC entry 250 (class 1259 OID 33696)
-- Name: Product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Product" (
    "ProductId" integer NOT NULL,
    "Userkey" character varying(255),
    "CategoryId" integer,
    "Title" character varying(255) NOT NULL,
    "ItemCode" character varying(100),
    "Price" numeric(18,2),
    "ListedPrice" numeric(18,2),
    "WarrantyDuration" character varying(100),
    "Quote" text,
    "Contentd" text,
    "Author" character varying(150),
    "Source" character varying(255),
    "Views" integer DEFAULT 0,
    "Note" text,
    "IsHighlights" boolean DEFAULT false,
    "InventoryStatus" boolean DEFAULT true,
    "Published" boolean DEFAULT true,
    "PublishedDtg" timestamp without time zone,
    "CreatedDtg" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "CreatedBy" character varying(100),
    "UpdatedDtg" timestamp without time zone,
    "UpdatedBy" character varying(100),
    "SEOTitle" character varying(255),
    "SEODescription" character varying(500),
    "SEOKeyWord" character varying(255),
    "LanguageCode" character varying(10),
    "Picture" character varying(500),
    "ModuleId" integer,
    "DisplayOrder" integer DEFAULT 0,
    "Isnew" boolean DEFAULT false,
    "ThongSokythuat" text,
    "KhuyenMai" text
);


ALTER TABLE public."Product" OWNER TO postgres;

--
-- TOC entry 251 (class 1259 OID 33710)
-- Name: ProductImages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ProductImages" (
    "Id" integer NOT NULL,
    "ProductId" integer NOT NULL,
    "ImageUrl" character varying(500) NOT NULL,
    "DisplayOrder" integer DEFAULT 0
);


ALTER TABLE public."ProductImages" OWNER TO postgres;

--
-- TOC entry 252 (class 1259 OID 33719)
-- Name: ProductImages_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ProductImages_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ProductImages_Id_seq" OWNER TO postgres;

--
-- TOC entry 5559 (class 0 OID 0)
-- Dependencies: 252
-- Name: ProductImages_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ProductImages_Id_seq" OWNED BY public."ProductImages"."Id";


--
-- TOC entry 253 (class 1259 OID 33720)
-- Name: ProductTags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ProductTags" (
    "Id" integer NOT NULL,
    "ProductId" integer NOT NULL,
    "TagId" integer NOT NULL
);


ALTER TABLE public."ProductTags" OWNER TO postgres;

--
-- TOC entry 254 (class 1259 OID 33726)
-- Name: ProductTags_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ProductTags_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ProductTags_Id_seq" OWNER TO postgres;

--
-- TOC entry 5560 (class 0 OID 0)
-- Dependencies: 254
-- Name: ProductTags_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ProductTags_Id_seq" OWNED BY public."ProductTags"."Id";


--
-- TOC entry 255 (class 1259 OID 33727)
-- Name: Product_ProductId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Product_ProductId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Product_ProductId_seq" OWNER TO postgres;

--
-- TOC entry 5561 (class 0 OID 0)
-- Dependencies: 255
-- Name: Product_ProductId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Product_ProductId_seq" OWNED BY public."Product"."ProductId";


--
-- TOC entry 256 (class 1259 OID 33728)
-- Name: Tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Tags" (
    "TagId" integer NOT NULL,
    "TagName" character varying(100) NOT NULL,
    "Slug" character varying(150) NOT NULL
);


ALTER TABLE public."Tags" OWNER TO postgres;

--
-- TOC entry 257 (class 1259 OID 33734)
-- Name: Tags_TagId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Tags_TagId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Tags_TagId_seq" OWNER TO postgres;

--
-- TOC entry 5562 (class 0 OID 0)
-- Dependencies: 257
-- Name: Tags_TagId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Tags_TagId_seq" OWNED BY public."Tags"."TagId";


--
-- TOC entry 258 (class 1259 OID 33735)
-- Name: TeacherCourses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TeacherCourses" (
    "Id" integer NOT NULL,
    "TeacherId" integer NOT NULL,
    "CourseId" integer NOT NULL,
    "RoleDescription" character varying(100)
);


ALTER TABLE public."TeacherCourses" OWNER TO postgres;

--
-- TOC entry 259 (class 1259 OID 33741)
-- Name: TeacherCourses_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."TeacherCourses_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."TeacherCourses_Id_seq" OWNER TO postgres;

--
-- TOC entry 5563 (class 0 OID 0)
-- Dependencies: 259
-- Name: TeacherCourses_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."TeacherCourses_Id_seq" OWNED BY public."TeacherCourses"."Id";


--
-- TOC entry 260 (class 1259 OID 33742)
-- Name: Teachers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Teachers" (
    "TeacherId" integer NOT NULL,
    "FullName" character varying(250) NOT NULL,
    "Slug" character varying(250) NOT NULL,
    "AcademicDegree" character varying(100) NOT NULL,
    "GraduatedUniversity" character varying(250) NOT NULL,
    "Position" character varying(200),
    "Subject" character varying(100) NOT NULL,
    "GradeLevels" character varying(100),
    "ExperienceYears" integer DEFAULT 0,
    "TeachingPhilosophy" character varying(1000),
    "BioTimelineJson" text,
    "AvatarUrl" character varying(500),
    "DisplayOrder" integer DEFAULT 0,
    "IsFeatured" boolean DEFAULT false,
    "IsActive" boolean DEFAULT true,
    "SeoTitle" character varying(250),
    "SeoDescription" character varying(500),
    "SeoKeywords" character varying(250),
    "CreatedDate" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "CreatedBy" character varying(100),
    "UpdatedDate" timestamp without time zone,
    "UpdatedBy" character varying(100)
);


ALTER TABLE public."Teachers" OWNER TO postgres;

--
-- TOC entry 261 (class 1259 OID 33758)
-- Name: Teachers_TeacherId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Teachers_TeacherId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Teachers_TeacherId_seq" OWNER TO postgres;

--
-- TOC entry 5564 (class 0 OID 0)
-- Dependencies: 261
-- Name: Teachers_TeacherId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Teachers_TeacherId_seq" OWNED BY public."Teachers"."TeacherId";


--
-- TOC entry 262 (class 1259 OID 33759)
-- Name: tbl_AdminActivity; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."tbl_AdminActivity" (
    "Id" integer NOT NULL,
    "Username" character varying(100) NOT NULL,
    "ActivityType" character varying(100) NOT NULL,
    "Module" character varying(100) NOT NULL,
    "Description" text,
    "IpAddress" character varying(50),
    "EntityId" integer,
    "EntityName" character varying(200),
    "CreatedDate" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."tbl_AdminActivity" OWNER TO postgres;

--
-- TOC entry 263 (class 1259 OID 33769)
-- Name: tbl_AdminActivity_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."tbl_AdminActivity_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."tbl_AdminActivity_Id_seq" OWNER TO postgres;

--
-- TOC entry 5565 (class 0 OID 0)
-- Dependencies: 263
-- Name: tbl_AdminActivity_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."tbl_AdminActivity_Id_seq" OWNED BY public."tbl_AdminActivity"."Id";


--
-- TOC entry 264 (class 1259 OID 33770)
-- Name: tbl_ArticleCategoryMap; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."tbl_ArticleCategoryMap" (
    "Id" integer NOT NULL,
    "ArticleId" integer NOT NULL,
    "CategoryId" integer NOT NULL
);


ALTER TABLE public."tbl_ArticleCategoryMap" OWNER TO postgres;

--
-- TOC entry 265 (class 1259 OID 33776)
-- Name: tbl_ArticleCategoryMap_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."tbl_ArticleCategoryMap_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."tbl_ArticleCategoryMap_Id_seq" OWNER TO postgres;

--
-- TOC entry 5566 (class 0 OID 0)
-- Dependencies: 265
-- Name: tbl_ArticleCategoryMap_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."tbl_ArticleCategoryMap_Id_seq" OWNED BY public."tbl_ArticleCategoryMap"."Id";


--
-- TOC entry 266 (class 1259 OID 33777)
-- Name: tbl_ArticleLV1; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."tbl_ArticleLV1" (
    "ArticleId" integer NOT NULL,
    "Userkey" character varying(255),
    "ClickNumber" integer DEFAULT 0,
    "Published" timestamp without time zone,
    "Title" character varying(500) NOT NULL,
    "Brief" text,
    "Contentd" text,
    "Picture" character varying(500),
    "Source" character varying(255),
    "Author" character varying(150),
    "IsHightLight" boolean DEFAULT false,
    "Ispublic" boolean DEFAULT true,
    "CreatedDate" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "CreatedBy" character varying(100),
    "UpdatedDtg" timestamp without time zone,
    "UpdatedBy" character varying(100),
    "SEOTitle" character varying(255),
    "SEODescription" character varying(500),
    "SEOKeyword" character varying(255),
    "LanguageCode" character varying(10),
    "ModuleId" integer,
    "Indexd" integer DEFAULT 0,
    "CategoryId" integer,
    "Ishot" boolean DEFAULT false,
    "DocumentCode" character varying(100),
    "AttachmentUrl" character varying(500),
    "ArticleType" integer DEFAULT 1
);


ALTER TABLE public."tbl_ArticleLV1" OWNER TO postgres;

--
-- TOC entry 267 (class 1259 OID 33791)
-- Name: tbl_ArticleLV1_ArticleId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."tbl_ArticleLV1_ArticleId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."tbl_ArticleLV1_ArticleId_seq" OWNER TO postgres;

--
-- TOC entry 5567 (class 0 OID 0)
-- Dependencies: 267
-- Name: tbl_ArticleLV1_ArticleId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."tbl_ArticleLV1_ArticleId_seq" OWNED BY public."tbl_ArticleLV1"."ArticleId";


--
-- TOC entry 268 (class 1259 OID 33792)
-- Name: tbl_BannerSection; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."tbl_BannerSection" (
    "Id" integer NOT NULL,
    "SectionName" character varying(255) NOT NULL,
    "SectionCode" character varying(100) NOT NULL,
    "Description" text,
    "ImageUrl" character varying(500),
    "TargetUrl" character varying(500),
    "DisplayOrder" integer DEFAULT 0,
    "IsActive" boolean DEFAULT true
);


ALTER TABLE public."tbl_BannerSection" OWNER TO postgres;

--
-- TOC entry 269 (class 1259 OID 33802)
-- Name: tbl_BannerSection_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."tbl_BannerSection_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."tbl_BannerSection_Id_seq" OWNER TO postgres;

--
-- TOC entry 5568 (class 0 OID 0)
-- Dependencies: 269
-- Name: tbl_BannerSection_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."tbl_BannerSection_Id_seq" OWNED BY public."tbl_BannerSection"."Id";


--
-- TOC entry 270 (class 1259 OID 33803)
-- Name: tbl_Contact; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."tbl_Contact" (
    "Id" integer NOT NULL,
    "FullName" character varying(200),
    "CompanyName" character varying(200),
    "Emaild" character varying(150),
    "Phone" character varying(50),
    "Addressd" character varying(300),
    "Titel" character varying(255),
    "Contend" text,
    "CreateDatetime" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "Status" boolean DEFAULT false,
    "UserProcessor" character varying(100)
);


ALTER TABLE public."tbl_Contact" OWNER TO postgres;

--
-- TOC entry 271 (class 1259 OID 33811)
-- Name: tbl_Contact_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."tbl_Contact_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."tbl_Contact_Id_seq" OWNER TO postgres;

--
-- TOC entry 5569 (class 0 OID 0)
-- Dependencies: 271
-- Name: tbl_Contact_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."tbl_Contact_Id_seq" OWNED BY public."tbl_Contact"."Id";


--
-- TOC entry 272 (class 1259 OID 33812)
-- Name: tbl_Document; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."tbl_Document" (
    "Id" integer NOT NULL,
    "SoKyHieu" character varying(100),
    "TrichYeu" text NOT NULL,
    "NgayBanHanh" timestamp without time zone,
    "NgayHieuLuc" timestamp without time zone,
    "CategoryId" integer,
    "HienThi" boolean DEFAULT true,
    "DisplayOrder" integer DEFAULT 0,
    "CreatedDate" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."tbl_Document" OWNER TO postgres;

--
-- TOC entry 273 (class 1259 OID 33822)
-- Name: tbl_DocumentCategory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."tbl_DocumentCategory" (
    "Id" integer NOT NULL,
    "CategoryName" character varying(255) NOT NULL,
    "Description" text,
    "DisplayOrder" integer DEFAULT 0,
    "IsActive" boolean DEFAULT true
);


ALTER TABLE public."tbl_DocumentCategory" OWNER TO postgres;

--
-- TOC entry 274 (class 1259 OID 33831)
-- Name: tbl_DocumentCategory_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."tbl_DocumentCategory_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."tbl_DocumentCategory_Id_seq" OWNER TO postgres;

--
-- TOC entry 5570 (class 0 OID 0)
-- Dependencies: 274
-- Name: tbl_DocumentCategory_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."tbl_DocumentCategory_Id_seq" OWNED BY public."tbl_DocumentCategory"."Id";


--
-- TOC entry 275 (class 1259 OID 33832)
-- Name: tbl_DocumentFiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."tbl_DocumentFiles" (
    "Id" integer NOT NULL,
    "DocumentId" integer NOT NULL,
    "TenFile" character varying(255) NOT NULL,
    "DuongDan" character varying(500) NOT NULL,
    "KichThuoc" bigint,
    "LoaiFile" character varying(50)
);


ALTER TABLE public."tbl_DocumentFiles" OWNER TO postgres;

--
-- TOC entry 276 (class 1259 OID 33841)
-- Name: tbl_DocumentFiles_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."tbl_DocumentFiles_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."tbl_DocumentFiles_Id_seq" OWNER TO postgres;

--
-- TOC entry 5571 (class 0 OID 0)
-- Dependencies: 276
-- Name: tbl_DocumentFiles_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."tbl_DocumentFiles_Id_seq" OWNED BY public."tbl_DocumentFiles"."Id";


--
-- TOC entry 277 (class 1259 OID 33842)
-- Name: tbl_Document_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."tbl_Document_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."tbl_Document_Id_seq" OWNER TO postgres;

--
-- TOC entry 5572 (class 0 OID 0)
-- Dependencies: 277
-- Name: tbl_Document_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."tbl_Document_Id_seq" OWNED BY public."tbl_Document"."Id";


--
-- TOC entry 278 (class 1259 OID 33843)
-- Name: tbl_FooterColumn; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."tbl_FooterColumn" (
    "Id" integer NOT NULL,
    "ColumnTitle" character varying(200) NOT NULL,
    "DisplayOrder" integer DEFAULT 0,
    "IsActive" boolean DEFAULT true
);


ALTER TABLE public."tbl_FooterColumn" OWNER TO postgres;

--
-- TOC entry 279 (class 1259 OID 33850)
-- Name: tbl_FooterColumn_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."tbl_FooterColumn_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."tbl_FooterColumn_Id_seq" OWNER TO postgres;

--
-- TOC entry 5573 (class 0 OID 0)
-- Dependencies: 279
-- Name: tbl_FooterColumn_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."tbl_FooterColumn_Id_seq" OWNED BY public."tbl_FooterColumn"."Id";


--
-- TOC entry 280 (class 1259 OID 33851)
-- Name: tbl_FooterConfig; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."tbl_FooterConfig" (
    "Id" integer NOT NULL,
    "CompanyName" character varying(255) NOT NULL,
    "Address" character varying(500),
    "Phone" character varying(50),
    "Hotline" character varying(50),
    "Email" character varying(100),
    "Website" character varying(255),
    "CopyrightText" character varying(500),
    "IsActive" boolean DEFAULT true
);


ALTER TABLE public."tbl_FooterConfig" OWNER TO postgres;

--
-- TOC entry 281 (class 1259 OID 33859)
-- Name: tbl_FooterConfig_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."tbl_FooterConfig_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."tbl_FooterConfig_Id_seq" OWNER TO postgres;

--
-- TOC entry 5574 (class 0 OID 0)
-- Dependencies: 281
-- Name: tbl_FooterConfig_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."tbl_FooterConfig_Id_seq" OWNED BY public."tbl_FooterConfig"."Id";


--
-- TOC entry 282 (class 1259 OID 33860)
-- Name: tbl_FooterLink; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."tbl_FooterLink" (
    "Id" integer NOT NULL,
    "ColumnId" integer NOT NULL,
    "LinkTitle" character varying(200) NOT NULL,
    "Url" character varying(500) NOT NULL,
    "DisplayOrder" integer DEFAULT 0,
    "IsActive" boolean DEFAULT true
);


ALTER TABLE public."tbl_FooterLink" OWNER TO postgres;

--
-- TOC entry 283 (class 1259 OID 33871)
-- Name: tbl_FooterLink_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."tbl_FooterLink_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."tbl_FooterLink_Id_seq" OWNER TO postgres;

--
-- TOC entry 5575 (class 0 OID 0)
-- Dependencies: 283
-- Name: tbl_FooterLink_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."tbl_FooterLink_Id_seq" OWNED BY public."tbl_FooterLink"."Id";


--
-- TOC entry 284 (class 1259 OID 33872)
-- Name: tbl_HomepageSection; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."tbl_HomepageSection" (
    "Id" integer NOT NULL,
    "SectionCode" character varying(100) NOT NULL,
    "Title" character varying(255),
    "SubTitle" character varying(500),
    "Content" text,
    "DisplayOrder" integer DEFAULT 0,
    "IsActive" boolean DEFAULT true
);


ALTER TABLE public."tbl_HomepageSection" OWNER TO postgres;

--
-- TOC entry 285 (class 1259 OID 33881)
-- Name: tbl_HomepageSection_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."tbl_HomepageSection_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."tbl_HomepageSection_Id_seq" OWNER TO postgres;

--
-- TOC entry 5576 (class 0 OID 0)
-- Dependencies: 285
-- Name: tbl_HomepageSection_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."tbl_HomepageSection_Id_seq" OWNED BY public."tbl_HomepageSection"."Id";


--
-- TOC entry 286 (class 1259 OID 33882)
-- Name: tbl_Language; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."tbl_Language" (
    "Id" integer NOT NULL,
    "Code" character varying(10) NOT NULL,
    "Name" character varying(100) NOT NULL,
    "IsDefault" boolean DEFAULT false,
    "DisplayOrder" integer DEFAULT 0
);


ALTER TABLE public."tbl_Language" OWNER TO postgres;

--
-- TOC entry 287 (class 1259 OID 33890)
-- Name: tbl_Language_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."tbl_Language_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."tbl_Language_Id_seq" OWNER TO postgres;

--
-- TOC entry 5577 (class 0 OID 0)
-- Dependencies: 287
-- Name: tbl_Language_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."tbl_Language_Id_seq" OWNED BY public."tbl_Language"."Id";


--
-- TOC entry 288 (class 1259 OID 33891)
-- Name: tbl_ModuleArticle; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."tbl_ModuleArticle" (
    "ModuleId" integer NOT NULL,
    "ModuleName" character varying(255) NOT NULL,
    "ModuleKey" character varying(150) NOT NULL,
    "UrlFrontEnd" character varying(500),
    "DisplayOrder" integer DEFAULT 0,
    "IsActive" boolean DEFAULT true,
    "ParentId" integer,
    "OnTopMenu" boolean DEFAULT true NOT NULL,
    "Icon" character varying(250),
    "IsClickable" boolean DEFAULT true NOT NULL,
    "TargetBlank" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."tbl_ModuleArticle" OWNER TO postgres;

--
-- TOC entry 289 (class 1259 OID 33901)
-- Name: tbl_ModuleArticle_ModuleId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."tbl_ModuleArticle_ModuleId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."tbl_ModuleArticle_ModuleId_seq" OWNER TO postgres;

--
-- TOC entry 5578 (class 0 OID 0)
-- Dependencies: 289
-- Name: tbl_ModuleArticle_ModuleId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."tbl_ModuleArticle_ModuleId_seq" OWNED BY public."tbl_ModuleArticle"."ModuleId";


--
-- TOC entry 290 (class 1259 OID 33902)
-- Name: tbl_Role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."tbl_Role" (
    "Id" integer NOT NULL,
    "Name" character varying(50) NOT NULL,
    "Description" character varying(255)
);


ALTER TABLE public."tbl_Role" OWNER TO postgres;

--
-- TOC entry 291 (class 1259 OID 33907)
-- Name: tbl_Role_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."tbl_Role_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."tbl_Role_Id_seq" OWNER TO postgres;

--
-- TOC entry 5579 (class 0 OID 0)
-- Dependencies: 291
-- Name: tbl_Role_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."tbl_Role_Id_seq" OWNED BY public."tbl_Role"."Id";


--
-- TOC entry 292 (class 1259 OID 33908)
-- Name: tbl_Slider; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."tbl_Slider" (
    "Id" integer NOT NULL,
    "Name" character varying(255),
    "UrlImage" character varying(500) NOT NULL,
    "Url" character varying(500),
    "Contens" text,
    "Indexd" integer DEFAULT 0,
    "IsPublic" boolean DEFAULT true,
    "LanguageCode" character varying(10)
);


ALTER TABLE public."tbl_Slider" OWNER TO postgres;

--
-- TOC entry 293 (class 1259 OID 33917)
-- Name: tbl_Slider_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."tbl_Slider_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."tbl_Slider_Id_seq" OWNER TO postgres;

--
-- TOC entry 5580 (class 0 OID 0)
-- Dependencies: 293
-- Name: tbl_Slider_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."tbl_Slider_Id_seq" OWNED BY public."tbl_Slider"."Id";


--
-- TOC entry 294 (class 1259 OID 33918)
-- Name: tbl_SocialNetwork; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."tbl_SocialNetwork" (
    "Id" integer NOT NULL,
    "NetworkName" character varying(100) NOT NULL,
    "IconClass" character varying(100),
    "Url" character varying(500) NOT NULL,
    "DisplayOrder" integer DEFAULT 0,
    "IsActive" boolean DEFAULT true
);


ALTER TABLE public."tbl_SocialNetwork" OWNER TO postgres;

--
-- TOC entry 295 (class 1259 OID 33928)
-- Name: tbl_SocialNetwork_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."tbl_SocialNetwork_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."tbl_SocialNetwork_Id_seq" OWNER TO postgres;

--
-- TOC entry 5581 (class 0 OID 0)
-- Dependencies: 295
-- Name: tbl_SocialNetwork_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."tbl_SocialNetwork_Id_seq" OWNED BY public."tbl_SocialNetwork"."Id";


--
-- TOC entry 296 (class 1259 OID 33929)
-- Name: tbl_User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."tbl_User" (
    "Id" integer NOT NULL,
    "Username" character varying(100) NOT NULL,
    "PasswordHash" character varying(255) NOT NULL,
    "FullName" character varying(200),
    "Email" character varying(150),
    "Phone" character varying(50),
    "Roles" integer,
    "Status" boolean DEFAULT true,
    "CreatedDate" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "LastLogin" timestamp without time zone
);


ALTER TABLE public."tbl_User" OWNER TO postgres;

--
-- TOC entry 297 (class 1259 OID 33939)
-- Name: tbl_User_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."tbl_User_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."tbl_User_Id_seq" OWNER TO postgres;

--
-- TOC entry 5582 (class 0 OID 0)
-- Dependencies: 297
-- Name: tbl_User_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."tbl_User_Id_seq" OWNED BY public."tbl_User"."Id";


--
-- TOC entry 298 (class 1259 OID 33940)
-- Name: tbl_VanPhongchinhanh; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."tbl_VanPhongchinhanh" (
    "Id" integer NOT NULL,
    "AnhQuocGia" character varying(500),
    "TenQuocGia" character varying(100),
    "AnhDaidien" character varying(500),
    "TieuDe" character varying(200),
    "DiaChi" character varying(300),
    "DienThoai" character varying(50),
    "Email" character varying(100),
    "Site" character varying(255),
    "ThuTuHienThi" integer DEFAULT 0
);


ALTER TABLE public."tbl_VanPhongchinhanh" OWNER TO postgres;

--
-- TOC entry 299 (class 1259 OID 33947)
-- Name: tbl_VanPhongchinhanh_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."tbl_VanPhongchinhanh_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."tbl_VanPhongchinhanh_Id_seq" OWNER TO postgres;

--
-- TOC entry 5583 (class 0 OID 0)
-- Dependencies: 299
-- Name: tbl_VanPhongchinhanh_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."tbl_VanPhongchinhanh_Id_seq" OWNED BY public."tbl_VanPhongchinhanh"."Id";


--
-- TOC entry 5062 (class 2604 OID 33948)
-- Name: Albums Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Albums" ALTER COLUMN "Id" SET DEFAULT nextval('public."Albums_Id_seq"'::regclass);


--
-- TOC entry 5066 (class 2604 OID 33949)
-- Name: Branches BranchId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Branches" ALTER COLUMN "BranchId" SET DEFAULT nextval('public."Branches_BranchId_seq"'::regclass);


--
-- TOC entry 5069 (class 2604 OID 33950)
-- Name: CategoryArticle CategoryId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CategoryArticle" ALTER COLUMN "CategoryId" SET DEFAULT nextval('public."CategoryArticle_CategoryId_seq"'::regclass);


--
-- TOC entry 5072 (class 2604 OID 33951)
-- Name: City CityId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."City" ALTER COLUMN "CityId" SET DEFAULT nextval('public."City_CityId_seq"'::regclass);


--
-- TOC entry 5073 (class 2604 OID 33952)
-- Name: ContactInfo Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ContactInfo" ALTER COLUMN "Id" SET DEFAULT nextval('public."ContactInfo_Id_seq"'::regclass);


--
-- TOC entry 5075 (class 2604 OID 33953)
-- Name: ContactMessages Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ContactMessages" ALTER COLUMN "Id" SET DEFAULT nextval('public."ContactMessages_Id_seq"'::regclass);


--
-- TOC entry 5078 (class 2604 OID 33954)
-- Name: CourseSyllabus SyllabusId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CourseSyllabus" ALTER COLUMN "SyllabusId" SET DEFAULT nextval('public."CourseSyllabus_SyllabusId_seq"'::regclass);


--
-- TOC entry 5080 (class 2604 OID 33955)
-- Name: Courses CourseId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Courses" ALTER COLUMN "CourseId" SET DEFAULT nextval('public."Courses_CourseId_seq"'::regclass);


--
-- TOC entry 5087 (class 2604 OID 33956)
-- Name: Dealership DealershipId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Dealership" ALTER COLUMN "DealershipId" SET DEFAULT nextval('public."Dealership_DealershipId_seq"'::regclass);


--
-- TOC entry 5089 (class 2604 OID 33957)
-- Name: District DistrictId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."District" ALTER COLUMN "DistrictId" SET DEFAULT nextval('public."District_DistrictId_seq"'::regclass);


--
-- TOC entry 5090 (class 2604 OID 33958)
-- Name: Enrollments EnrollmentId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Enrollments" ALTER COLUMN "EnrollmentId" SET DEFAULT nextval('public."Enrollments_EnrollmentId_seq"'::regclass);


--
-- TOC entry 5093 (class 2604 OID 33959)
-- Name: ExtendedProperty Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ExtendedProperty" ALTER COLUMN "Id" SET DEFAULT nextval('public."ExtendedProperty_Id_seq"'::regclass);


--
-- TOC entry 5094 (class 2604 OID 33960)
-- Name: GalleryConfig Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GalleryConfig" ALTER COLUMN "Id" SET DEFAULT nextval('public."GalleryConfig_Id_seq"'::regclass);


--
-- TOC entry 5097 (class 2604 OID 33961)
-- Name: Logo Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Logo" ALTER COLUMN "Id" SET DEFAULT nextval('public."Logo_Id_seq"'::regclass);


--
-- TOC entry 5099 (class 2604 OID 33962)
-- Name: Medias Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Medias" ALTER COLUMN "Id" SET DEFAULT nextval('public."Medias_Id_seq"'::regclass);


--
-- TOC entry 5103 (class 2604 OID 33963)
-- Name: Product ProductId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product" ALTER COLUMN "ProductId" SET DEFAULT nextval('public."Product_ProductId_seq"'::regclass);


--
-- TOC entry 5111 (class 2604 OID 33964)
-- Name: ProductImages Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductImages" ALTER COLUMN "Id" SET DEFAULT nextval('public."ProductImages_Id_seq"'::regclass);


--
-- TOC entry 5113 (class 2604 OID 33965)
-- Name: ProductTags Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductTags" ALTER COLUMN "Id" SET DEFAULT nextval('public."ProductTags_Id_seq"'::regclass);


--
-- TOC entry 5114 (class 2604 OID 33966)
-- Name: Tags TagId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tags" ALTER COLUMN "TagId" SET DEFAULT nextval('public."Tags_TagId_seq"'::regclass);


--
-- TOC entry 5115 (class 2604 OID 33967)
-- Name: TeacherCourses Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TeacherCourses" ALTER COLUMN "Id" SET DEFAULT nextval('public."TeacherCourses_Id_seq"'::regclass);


--
-- TOC entry 5116 (class 2604 OID 33968)
-- Name: Teachers TeacherId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Teachers" ALTER COLUMN "TeacherId" SET DEFAULT nextval('public."Teachers_TeacherId_seq"'::regclass);


--
-- TOC entry 5122 (class 2604 OID 33969)
-- Name: tbl_AdminActivity Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbl_AdminActivity" ALTER COLUMN "Id" SET DEFAULT nextval('public."tbl_AdminActivity_Id_seq"'::regclass);


--
-- TOC entry 5124 (class 2604 OID 33970)
-- Name: tbl_ArticleCategoryMap Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbl_ArticleCategoryMap" ALTER COLUMN "Id" SET DEFAULT nextval('public."tbl_ArticleCategoryMap_Id_seq"'::regclass);


--
-- TOC entry 5125 (class 2604 OID 33971)
-- Name: tbl_ArticleLV1 ArticleId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbl_ArticleLV1" ALTER COLUMN "ArticleId" SET DEFAULT nextval('public."tbl_ArticleLV1_ArticleId_seq"'::regclass);


--
-- TOC entry 5133 (class 2604 OID 33972)
-- Name: tbl_BannerSection Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbl_BannerSection" ALTER COLUMN "Id" SET DEFAULT nextval('public."tbl_BannerSection_Id_seq"'::regclass);


--
-- TOC entry 5136 (class 2604 OID 33973)
-- Name: tbl_Contact Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbl_Contact" ALTER COLUMN "Id" SET DEFAULT nextval('public."tbl_Contact_Id_seq"'::regclass);


--
-- TOC entry 5139 (class 2604 OID 33974)
-- Name: tbl_Document Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbl_Document" ALTER COLUMN "Id" SET DEFAULT nextval('public."tbl_Document_Id_seq"'::regclass);


--
-- TOC entry 5143 (class 2604 OID 33975)
-- Name: tbl_DocumentCategory Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbl_DocumentCategory" ALTER COLUMN "Id" SET DEFAULT nextval('public."tbl_DocumentCategory_Id_seq"'::regclass);


--
-- TOC entry 5146 (class 2604 OID 33976)
-- Name: tbl_DocumentFiles Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbl_DocumentFiles" ALTER COLUMN "Id" SET DEFAULT nextval('public."tbl_DocumentFiles_Id_seq"'::regclass);


--
-- TOC entry 5147 (class 2604 OID 33977)
-- Name: tbl_FooterColumn Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbl_FooterColumn" ALTER COLUMN "Id" SET DEFAULT nextval('public."tbl_FooterColumn_Id_seq"'::regclass);


--
-- TOC entry 5150 (class 2604 OID 33978)
-- Name: tbl_FooterConfig Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbl_FooterConfig" ALTER COLUMN "Id" SET DEFAULT nextval('public."tbl_FooterConfig_Id_seq"'::regclass);


--
-- TOC entry 5152 (class 2604 OID 33979)
-- Name: tbl_FooterLink Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbl_FooterLink" ALTER COLUMN "Id" SET DEFAULT nextval('public."tbl_FooterLink_Id_seq"'::regclass);


--
-- TOC entry 5155 (class 2604 OID 33980)
-- Name: tbl_HomepageSection Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbl_HomepageSection" ALTER COLUMN "Id" SET DEFAULT nextval('public."tbl_HomepageSection_Id_seq"'::regclass);


--
-- TOC entry 5158 (class 2604 OID 33981)
-- Name: tbl_Language Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbl_Language" ALTER COLUMN "Id" SET DEFAULT nextval('public."tbl_Language_Id_seq"'::regclass);


--
-- TOC entry 5161 (class 2604 OID 33982)
-- Name: tbl_ModuleArticle ModuleId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbl_ModuleArticle" ALTER COLUMN "ModuleId" SET DEFAULT nextval('public."tbl_ModuleArticle_ModuleId_seq"'::regclass);


--
-- TOC entry 5167 (class 2604 OID 33983)
-- Name: tbl_Role Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbl_Role" ALTER COLUMN "Id" SET DEFAULT nextval('public."tbl_Role_Id_seq"'::regclass);


--
-- TOC entry 5168 (class 2604 OID 33984)
-- Name: tbl_Slider Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbl_Slider" ALTER COLUMN "Id" SET DEFAULT nextval('public."tbl_Slider_Id_seq"'::regclass);


--
-- TOC entry 5171 (class 2604 OID 33985)
-- Name: tbl_SocialNetwork Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbl_SocialNetwork" ALTER COLUMN "Id" SET DEFAULT nextval('public."tbl_SocialNetwork_Id_seq"'::regclass);


--
-- TOC entry 5174 (class 2604 OID 33986)
-- Name: tbl_User Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbl_User" ALTER COLUMN "Id" SET DEFAULT nextval('public."tbl_User_Id_seq"'::regclass);


--
-- TOC entry 5177 (class 2604 OID 33987)
-- Name: tbl_VanPhongchinhanh Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbl_VanPhongchinhanh" ALTER COLUMN "Id" SET DEFAULT nextval('public."tbl_VanPhongchinhanh_Id_seq"'::regclass);


--
-- TOC entry 5457 (class 0 OID 33545)
-- Dependencies: 220
-- Data for Name: Albums; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5459 (class 0 OID 33557)
-- Dependencies: 222
-- Data for Name: Branches; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Branches" ("BranchId", "BranchName", "Address", "Phone", "Hotline", "Email", "WorkingHours", "GoogleMapsEmbedUrl", "GoogleMapsDirectionsUrl", "Latitude", "Longitude", "ImageUrl", "DisplayOrder", "IsActive") VALUES (1, 'Cơ sở 1 - Bình Phú', 'Số 01 Đường Số 6, Phường Bình Phú, Quận 6, TP.HCM', '028.3876.5432', '0906.716.727', 'smartedu.academy.vn@gmail.com', 'Thứ 2 - Chủ Nhật: 07:30 - 21:00', 'https://maps.google.com/maps?q=10.7456,106.6345&z=17&output=embed', 'https://maps.google.com/?q=10.7456,106.6345', 10.7456000, 106.6345000, NULL, 1, true);
INSERT INTO public."Branches" ("BranchId", "BranchName", "Address", "Phone", "Hotline", "Email", "WorkingHours", "GoogleMapsEmbedUrl", "GoogleMapsDirectionsUrl", "Latitude", "Longitude", "ImageUrl", "DisplayOrder", "IsActive") VALUES (2, 'Cơ sở 2 - Chợ Lớn', 'Số 17 Đường Chợ Lớn, Phường Bình Phú, Quận 6, TP.HCM', '028.3876.5433', '0901.873.466', 'smartedu.academy.vn@gmail.com', 'Thứ 2 - Chủ Nhật: 07:30 - 21:00', 'https://maps.google.com/maps?q=10.7482,106.6321&z=17&output=embed', 'https://maps.google.com/?q=10.7482,106.6321', 10.7482000, 106.6321000, NULL, 2, true);


--
-- TOC entry 5461 (class 0 OID 33568)
-- Dependencies: 224
-- Data for Name: CategoryArticle; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5463 (class 0 OID 33578)
-- Dependencies: 226
-- Data for Name: City; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5465 (class 0 OID 33584)
-- Dependencies: 228
-- Data for Name: ContactInfo; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."ContactInfo" ("Id", "CompanyName", "Address", "Phone", "Hotline", "Email", "MapEmbed", "IsActive") VALUES (1, 'SmartEdu Academy - Trung Tâm Bồi Dưỡng Văn Hóa & Luyện Thi', 'Số 01 Đường Số 6, P. Bình Phú, Quận 6, TP.HCM', '028.3876.5432', '0906.716.727', 'smartedu.academy.vn@gmail.com', NULL, true);


--
-- TOC entry 5467 (class 0 OID 33592)
-- Dependencies: 230
-- Data for Name: ContactMessages; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5469 (class 0 OID 33604)
-- Dependencies: 232
-- Data for Name: CourseSyllabus; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."CourseSyllabus" ("SyllabusId", "CourseId", "SemesterName", "TopicTitle", "TopicContent", "DisplayOrder") VALUES (1, 1, 'Học kỳ 1', 'Chuyên đề 1: Số học & Các bài toán chia hết nâng cao', 'Ôn tập phân số, số thập phân, quan hệ chia hết, dấu hiệu chia hết và ứng dụng giải bài toán thực tế.', 1);
INSERT INTO public."CourseSyllabus" ("SyllabusId", "CourseId", "SemesterName", "TopicTitle", "TopicContent", "DisplayOrder") VALUES (2, 1, 'Học kỳ 1', 'Chuyên đề 2: Hình học trực quan & Đo lường thực tiễn', 'Nhận diện các hình phẳng trong thực tiễn, tính chu vi diện tích hình thang, hình thoi, hình bình hành.', 2);
INSERT INTO public."CourseSyllabus" ("SyllabusId", "CourseId", "SemesterName", "TopicTitle", "TopicContent", "DisplayOrder") VALUES (3, 1, 'Học kỳ 2', 'Chuyên đề 3: Biểu thức đại số & Phương trình đơn giản', 'Quy tắc chuyển vế, mở ngoặc, giải phương trình bậc nhất một ẩn và bài toán tìm x ứng dụng.', 3);
INSERT INTO public."CourseSyllabus" ("SyllabusId", "CourseId", "SemesterName", "TopicTitle", "TopicContent", "DisplayOrder") VALUES (4, 1, 'Học kỳ 2', 'Chuyên đề 4: Luyện đề tổng hợp & Ôn thi học kỳ', 'Hệ thống hóa toàn bộ kiến thức năm học, rèn luyện 15 bộ đề sát chuẩn thi học kỳ đạt điểm 9-10.', 4);


--
-- TOC entry 5471 (class 0 OID 33615)
-- Dependencies: 234
-- Data for Name: Courses; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Courses" ("CourseId", "CourseName", "Slug", "GradeLevel", "Grade", "Subject", "ShortDescription", "ContentHtml", "ThumbnailUrl", "BannerUrl", "PsychologyOverview", "TargetKnowledge", "TargetThinking", "TargetSkills", "TuitionFee", "TuitionPeriod", "ScheduleSummary", "ClassSizeMax", "HasFreeTutoringGuarantee", "HasTuitionRefundGuarantee", "DisplayOrder", "IsFeatured", "IsActive", "SeoTitle", "SeoDescription", "SeoKeywords", "CreatedDate", "CreatedBy", "UpdatedDate", "UpdatedBy") VALUES (1, 'Toán Tư Duy & Nâng Cao Cấp 2', 'toan-tu-duy-nang-cao-cap-2', 'Cap2', 'Lớp 6 - Lớp 9', 'Toán học', 'Chương trình bồi dưỡng toàn diện năng lực tư duy toán học, giúp học sinh xóa tan nỗi sợ hình học & đại số, tự tin đạt điểm 8-9-10.', NULL, NULL, NULL, 'Học sinh Cấp 2 bước vào giai đoạn chuyển giao tư duy trừu tượng. Việc nhồi nhét công thức khiến các em dễ mất gốc hình học và sợ hãi các bài toán thực tế. SmartEdu đồng hành gỡ rối từng nút thắt.', 'Nắm vững 100% định lý, công thức trọng tâm sách giáo khoa mới (Cánh Diều, Kết Nối, Chân Trời Sáng Tạo).', 'Rèn luyện tư duy phản biện, khả năng phân tích bài toán phức tạp thành các bước nhỏ mạch lạc.', 'Kỹ năng phân bổ thời gian phòng thi, trình bày lời giải chuẩn barem điểm không bị trừ điểm vặt.', 1600000.00, '/tháng', '2 buổi/tuần (90 phút/buổi)', 15, true, true, 1, true, true, 'Khóa học Toán Cấp 2 - SmartEdu Academy', NULL, NULL, '2026-10-26 08:14:13.677676', NULL, NULL, NULL);
INSERT INTO public."Courses" ("CourseId", "CourseName", "Slug", "GradeLevel", "Grade", "Subject", "ShortDescription", "ContentHtml", "ThumbnailUrl", "BannerUrl", "PsychologyOverview", "TargetKnowledge", "TargetThinking", "TargetSkills", "TuitionFee", "TuitionPeriod", "ScheduleSummary", "ClassSizeMax", "HasFreeTutoringGuarantee", "HasTuitionRefundGuarantee", "DisplayOrder", "IsFeatured", "IsActive", "SeoTitle", "SeoDescription", "SeoKeywords", "CreatedDate", "CreatedBy", "UpdatedDate", "UpdatedBy") VALUES (2, 'Khoa Học Tự Nhiên Toàn Diện (Lý - Hóa - Sinh)', 'khoa-hoc-tu-nhien-toan-dien', 'Cap2', 'Lớp 6 - Lớp 9', 'Khoa học Tự nhiên', 'Tích hợp 3 phân môn Vật Lý - Hóa Học - Sinh Học với phương pháp học qua hiện tượng và sơ đồ tư duy thực tế.', NULL, NULL, NULL, 'Môn KHTN tích hợp làm nhiều phụ huynh và học sinh hoang mang vì khối lượng kiến thức đa ngành. Phương pháp trực quan của SmartEdu giúp các em kết nối logic thay vì học vẹt.', 'Hiểu sâu bản chất các định luật chuyển động, cấu tạo chất, phản ứng hóa học và chu trình sinh học.', 'Tư duy quan sát khoa học, phân tích nguyên nhân - kết quả trong các hiện tượng đời sống.', 'Kỹ năng đọc biểu đồ số liệu, giải bài toán tích hợp liên môn đạt điểm tuyệt đối.', 1500000.00, '/tháng', '2 buổi/tuần (90 phút/buổi)', 15, true, true, 2, true, true, 'Khóa học KHTN Cấp 2 - SmartEdu Academy', NULL, NULL, '2026-10-26 08:14:13.677676', NULL, NULL, NULL);
INSERT INTO public."Courses" ("CourseId", "CourseName", "Slug", "GradeLevel", "Grade", "Subject", "ShortDescription", "ContentHtml", "ThumbnailUrl", "BannerUrl", "PsychologyOverview", "TargetKnowledge", "TargetThinking", "TargetSkills", "TuitionFee", "TuitionPeriod", "ScheduleSummary", "ClassSizeMax", "HasFreeTutoringGuarantee", "HasTuitionRefundGuarantee", "DisplayOrder", "IsFeatured", "IsActive", "SeoTitle", "SeoDescription", "SeoKeywords", "CreatedDate", "CreatedBy", "UpdatedDate", "UpdatedBy") VALUES (3, 'Chiến Binh Bứt Phá - Luyện Thi Vào Lớp 10 Tuyển Sinh', 'luyen-thi-vao-lop-10-tuyen-sinh', 'ChuyenCap', 'Lớp 9', 'Toán học', 'Lộ trình ôn thi chuyên sâu bám sát cấu trúc đề thi tuyển sinh vào Lớp 10 công lập tại TP.HCM. Cam kết đầu ra đỗ trường nguyện vọng 1.', NULL, NULL, NULL, 'Năm học lớp 9 mang áp lực thi cử rất lớn cho cả phụ huynh và học sinh. Thầy cô SmartEdu đóng vai trò người kèm cặp tâm lý kiên nhẫn, kèm ngoài giờ miễn phí từng chuyên đề còn yếu.', 'Quét sạch 12 dạng toán thực tế kinh điển trong đề thi Tuyển sinh 10 TP.HCM.', 'Tư duy mô hình hóa thực tế thành phương trình toán học giải quyết nhanh chóng.', 'Kỹ năng làm bài áp lực thời gian, tối ưu hóa điểm số từng câu hỏi.', 1800000.00, '/tháng', '3 buổi/tuần (120 phút/buổi)', 12, true, true, 3, true, true, 'Luyện thi Lớp 10 Tuyển sinh - SmartEdu Academy', NULL, NULL, '2026-10-26 08:14:13.677676', NULL, NULL, NULL);
INSERT INTO public."Courses" ("CourseId", "CourseName", "Slug", "GradeLevel", "Grade", "Subject", "ShortDescription", "ContentHtml", "ThumbnailUrl", "BannerUrl", "PsychologyOverview", "TargetKnowledge", "TargetThinking", "TargetSkills", "TuitionFee", "TuitionPeriod", "ScheduleSummary", "ClassSizeMax", "HasFreeTutoringGuarantee", "HasTuitionRefundGuarantee", "DisplayOrder", "IsFeatured", "IsActive", "SeoTitle", "SeoDescription", "SeoKeywords", "CreatedDate", "CreatedBy", "UpdatedDate", "UpdatedBy") VALUES (4, 'Bồi Dưỡng Toán - Lý - Hóa 10 - 12', 'boi-duong-toan-ly-hoa-10-12', 'Cap3', 'Lớp 10 - Lớp 12', 'Khoa học Tự nhiên', 'Lộ trình bồi dưỡng chuyên sâu kiến thức Toán, Lý, Hóa cấp THPT, bám sát cấu trúc đề thi Tốt nghiệp và ĐGNL ĐHQG TP.HCM.', '<p>Nội dung chi tiết chương trình bồi dưỡng THPT...</p>', 'assets/images/courses/course-thpt-1.jpg', NULL, NULL, NULL, NULL, NULL, 1900000.00, '/tháng', '3 buổi/tuần (120 phút/buổi)', 12, true, true, 0, true, true, NULL, NULL, NULL, '2026-11-03 17:39:01.831138', NULL, NULL, NULL);
INSERT INTO public."Courses" ("CourseId", "CourseName", "Slug", "GradeLevel", "Grade", "Subject", "ShortDescription", "ContentHtml", "ThumbnailUrl", "BannerUrl", "PsychologyOverview", "TargetKnowledge", "TargetThinking", "TargetSkills", "TuitionFee", "TuitionPeriod", "ScheduleSummary", "ClassSizeMax", "HasFreeTutoringGuarantee", "HasTuitionRefundGuarantee", "DisplayOrder", "IsFeatured", "IsActive", "SeoTitle", "SeoDescription", "SeoKeywords", "CreatedDate", "CreatedBy", "UpdatedDate", "UpdatedBy") VALUES (5, 'Luyện Thi ĐGNL & Tốt Nghiệp THPT Quốc Gia', 'luyen-thi-dgnl-tot-nghiep-thpt', 'Cap3', 'Lớp 12', 'Luyện thi Đại học', 'Giải pháp tổng ôn bứt phá điểm số 9+ kỳ thi ĐGNL và Tốt nghiệp THPT, cam kết đầu ra đỗ nguyện vọng 1 Đại học.', '<p>Nội dung chi tiết lộ trình luyện thi ĐGNL...</p>', 'assets/images/courses/course-thpt-2.jpg', NULL, NULL, NULL, NULL, NULL, 2200000.00, '/tháng', '3 buổi/tuần (120 phút/buổi)', 10, true, true, 0, true, true, NULL, NULL, NULL, '2026-11-03 17:39:01.831138', NULL, NULL, NULL);


--
-- TOC entry 5473 (class 0 OID 33632)
-- Dependencies: 236
-- Data for Name: Dealership; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5475 (class 0 OID 33641)
-- Dependencies: 238
-- Data for Name: District; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5477 (class 0 OID 33648)
-- Dependencies: 240
-- Data for Name: Enrollments; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5479 (class 0 OID 33660)
-- Dependencies: 242
-- Data for Name: ExtendedProperty; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5481 (class 0 OID 33669)
-- Dependencies: 244
-- Data for Name: GalleryConfig; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5483 (class 0 OID 33676)
-- Dependencies: 246
-- Data for Name: Logo; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5485 (class 0 OID 33685)
-- Dependencies: 248
-- Data for Name: Medias; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5487 (class 0 OID 33696)
-- Dependencies: 250
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5488 (class 0 OID 33710)
-- Dependencies: 251
-- Data for Name: ProductImages; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5490 (class 0 OID 33720)
-- Dependencies: 253
-- Data for Name: ProductTags; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5493 (class 0 OID 33728)
-- Dependencies: 256
-- Data for Name: Tags; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5495 (class 0 OID 33735)
-- Dependencies: 258
-- Data for Name: TeacherCourses; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."TeacherCourses" ("Id", "TeacherId", "CourseId", "RoleDescription") VALUES (1, 1, 1, 'Trưởng bộ môn & Giảng viên chính');
INSERT INTO public."TeacherCourses" ("Id", "TeacherId", "CourseId", "RoleDescription") VALUES (2, 1, 3, 'Chuyên gia Luyện thi Tuyển sinh 10');


--
-- TOC entry 5497 (class 0 OID 33742)
-- Dependencies: 260
-- Data for Name: Teachers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Teachers" ("TeacherId", "FullName", "Slug", "AcademicDegree", "GraduatedUniversity", "Position", "Subject", "GradeLevels", "ExperienceYears", "TeachingPhilosophy", "BioTimelineJson", "AvatarUrl", "DisplayOrder", "IsFeatured", "IsActive", "SeoTitle", "SeoDescription", "SeoKeywords", "CreatedDate", "CreatedBy", "UpdatedDate", "UpdatedBy") VALUES (1, 'Thầy Nguyễn Văn Tuấn', 'thay-nguyen-van-tuan', 'Thạc sĩ Toán học', 'Đại học Sư phạm TP.HCM', 'Trưởng bộ môn Toán & Luyện thi', 'Toán học', 'Cấp 2, Cấp 3', 15, 'Toán học không phải là học thuộc công thức, mà là chìa khóa mở rộng tư duy giải quyết vấn đề trong cuộc sống.', '[{"year":"2009-2013","event":"Tốt nghiệp Thủ khoa Sư phạm Toán - ĐH Sư phạm TP.HCM"},{"year":"2013-2016","event":"Thạc sĩ Phương pháp Giảng dạy Toán học"},{"year":"2016-nay","event":"Đồng hành đào tạo hơn 2,500 học sinh đỗ trường THPT Top đầu TP.HCM"}]', '/assets/images/teachers/teacher-1.jpg', 1, true, true, 'Thầy Nguyễn Văn Tuấn - Thạc sĩ Toán học ĐH Sư phạm TP.HCM', NULL, NULL, '2026-10-26 08:14:13.655342', NULL, NULL, NULL);
INSERT INTO public."Teachers" ("TeacherId", "FullName", "Slug", "AcademicDegree", "GraduatedUniversity", "Position", "Subject", "GradeLevels", "ExperienceYears", "TeachingPhilosophy", "BioTimelineJson", "AvatarUrl", "DisplayOrder", "IsFeatured", "IsActive", "SeoTitle", "SeoDescription", "SeoKeywords", "CreatedDate", "CreatedBy", "UpdatedDate", "UpdatedBy") VALUES (2, 'Cô Trần Thị Mai Chi', 'co-tran-thi-mai-chi', 'Thạc sĩ Hóa học', 'Đại học Sư phạm TP.HCM', 'Chuyên gia Khoa học Tự nhiên', 'Khoa học Tự nhiên', 'Cấp 2, Cấp 3', 12, 'Mỗi thí nghiệm là một câu chuyện kỳ diệu. Học KHTN là chạm vào bản chất của thế giới xung quanh.', '[{"year":"2012-2016","event":"Cử nhân Sư phạm Hóa học xuất sắc - ĐH Sư phạm TP.HCM"},{"year":"2016-2019","event":"Thạc sĩ Hóa học lý thuyết & ứng dụng"},{"year":"2019-nay","event":"Chủ nhiệm bồi dưỡng học sinh giỏi KHTN Quận 6"}]', '/assets/images/teachers/teacher-2.jpg', 2, true, true, 'Cô Trần Thị Mai Chi - Thạc sĩ KHTN ĐH Sư phạm TP.HCM', NULL, NULL, '2026-10-26 08:14:13.655342', NULL, NULL, NULL);
INSERT INTO public."Teachers" ("TeacherId", "FullName", "Slug", "AcademicDegree", "GraduatedUniversity", "Position", "Subject", "GradeLevels", "ExperienceYears", "TeachingPhilosophy", "BioTimelineJson", "AvatarUrl", "DisplayOrder", "IsFeatured", "IsActive", "SeoTitle", "SeoDescription", "SeoKeywords", "CreatedDate", "CreatedBy", "UpdatedDate", "UpdatedBy") VALUES (3, 'Thầy Lê Hoàng Nam', 'thay-le-hoang-nam', 'Cử nhân Vật Lý Xuất Sắc', 'Đại học Khoa học Tự nhiên TP.HCM', 'Giảng viên Chuyên sâu Vật Lý', 'Vật Lý', 'Cấp 2, Cấp 3', 10, 'Biến định luật khô khan thành hiện tượng trực quan sinh động, giúp học sinh yêu thích và ghi nhớ bền vững.', '[{"year":"2014-2018","event":"Tốt nghiệp ĐH Khoa học Tự nhiên TP.HCM"},{"year":"2018-nay","event":"Tác giả bộ chuyên đề Lấy lại gốc và Đột phá điểm 9+ môn Vật Lý THPT"}]', '/assets/images/teachers/teacher-3.jpg', 3, true, true, 'Thầy Lê Hoàng Nam - Giảng viên Vật Lý ĐH KHTN', NULL, NULL, '2026-10-26 08:14:13.655342', NULL, NULL, NULL);
INSERT INTO public."Teachers" ("TeacherId", "FullName", "Slug", "AcademicDegree", "GraduatedUniversity", "Position", "Subject", "GradeLevels", "ExperienceYears", "TeachingPhilosophy", "BioTimelineJson", "AvatarUrl", "DisplayOrder", "IsFeatured", "IsActive", "SeoTitle", "SeoDescription", "SeoKeywords", "CreatedDate", "CreatedBy", "UpdatedDate", "UpdatedBy") VALUES (4, 'Cô Phạm Thu Hà', 'co-pham-thu-ha', 'Cử nhân Sư phạm Tiếng Anh', 'Đại học Sài Gòn', 'Trưởng bộ môn Tiếng Anh Học thuật', 'Tiếng Anh', 'Cấp 1, Cấp 2', 8, 'Ngôn ngữ là phản xạ tự nhiên khi trẻ được đặt trong môi trường tương tác ấm áp, không sợ sai.', '[{"year":"2016-2020","event":"Tốt nghiệp Sư phạm Tiếng Anh - ĐH Sài Gòn (IELTS 8.0)"},{"year":"2020-nay","event":"Chuyên gia luyện thi Chứng chỉ Cambridge & Tiếng Anh vào Lớp 10"}]', '/assets/images/teachers/teacher-6.jpg', 4, true, true, 'Cô Phạm Thu Hà - Giáo viên Tiếng Anh ĐH Sài Gòn', NULL, NULL, '2026-10-26 08:14:13.655342', NULL, NULL, NULL);


--
-- TOC entry 5499 (class 0 OID 33759)
-- Dependencies: 262
-- Data for Name: tbl_AdminActivity; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."tbl_AdminActivity" ("Id", "Username", "ActivityType", "Module", "Description", "IpAddress", "EntityId", "EntityName", "CreatedDate") VALUES (1, 'AdminUser', 'AdminLoginFailed', 'AdminAuth', 'Failed login attempt', '::1', NULL, NULL, '2026-10-30 16:34:53.167462');
INSERT INTO public."tbl_AdminActivity" ("Id", "Username", "ActivityType", "Module", "Description", "IpAddress", "EntityId", "EntityName", "CreatedDate") VALUES (2, 'admin', 'AdminLoginFailed', 'AdminAuth', 'Failed login attempt', '::1', NULL, NULL, '2026-10-30 16:39:27.956429');
INSERT INTO public."tbl_AdminActivity" ("Id", "Username", "ActivityType", "Module", "Description", "IpAddress", "EntityId", "EntityName", "CreatedDate") VALUES (3, 'admin', 'AdminLoginFailed', 'AdminAuth', 'Failed login attempt', '::1', NULL, NULL, '2026-10-30 16:39:36.714184');
INSERT INTO public."tbl_AdminActivity" ("Id", "Username", "ActivityType", "Module", "Description", "IpAddress", "EntityId", "EntityName", "CreatedDate") VALUES (4, 'admin', 'AdminLoginFailed', 'AdminAuth', 'Failed login attempt', '::1', NULL, NULL, '2026-10-30 16:39:37.721713');
INSERT INTO public."tbl_AdminActivity" ("Id", "Username", "ActivityType", "Module", "Description", "IpAddress", "EntityId", "EntityName", "CreatedDate") VALUES (5, 'admin', 'AdminLoginFailed', 'AdminAuth', 'Failed login attempt', '::1', NULL, NULL, '2026-10-30 16:39:52.74927');
INSERT INTO public."tbl_AdminActivity" ("Id", "Username", "ActivityType", "Module", "Description", "IpAddress", "EntityId", "EntityName", "CreatedDate") VALUES (6, 'admin', 'AdminLoginFailed', 'AdminAuth', 'Failed login attempt', '::1', NULL, NULL, '2026-10-30 16:39:53.685105');
INSERT INTO public."tbl_AdminActivity" ("Id", "Username", "ActivityType", "Module", "Description", "IpAddress", "EntityId", "EntityName", "CreatedDate") VALUES (7, 'admin', 'AdminLoginFailed', 'AdminAuth', 'Failed login attempt', '::1', NULL, NULL, '2026-10-30 16:39:53.822059');
INSERT INTO public."tbl_AdminActivity" ("Id", "Username", "ActivityType", "Module", "Description", "IpAddress", "EntityId", "EntityName", "CreatedDate") VALUES (8, 'admin', 'AdminLoginFailed', 'AdminAuth', 'Failed login attempt', '::1', NULL, NULL, '2026-10-30 16:40:01.536362');
INSERT INTO public."tbl_AdminActivity" ("Id", "Username", "ActivityType", "Module", "Description", "IpAddress", "EntityId", "EntityName", "CreatedDate") VALUES (9, 'admin', 'AdminLoginFailed', 'AdminAuth', 'Failed login attempt', '::1', NULL, NULL, '2026-10-30 16:40:25.035579');
INSERT INTO public."tbl_AdminActivity" ("Id", "Username", "ActivityType", "Module", "Description", "IpAddress", "EntityId", "EntityName", "CreatedDate") VALUES (10, 'admin', 'AdminLoginFailed', 'AdminAuth', 'Failed login attempt', '::1', NULL, NULL, '2026-10-30 16:40:31.529771');
INSERT INTO public."tbl_AdminActivity" ("Id", "Username", "ActivityType", "Module", "Description", "IpAddress", "EntityId", "EntityName", "CreatedDate") VALUES (11, 'admin', 'AdminLoginFailed', 'AdminAuth', 'Failed login attempt', '::1', NULL, NULL, '2026-10-30 16:41:13.016057');
INSERT INTO public."tbl_AdminActivity" ("Id", "Username", "ActivityType", "Module", "Description", "IpAddress", "EntityId", "EntityName", "CreatedDate") VALUES (12, 'admin', 'AdminLoginFailed', 'AdminAuth', 'Failed login attempt', '::1', NULL, NULL, '2026-10-30 16:42:21.609063');
INSERT INTO public."tbl_AdminActivity" ("Id", "Username", "ActivityType", "Module", "Description", "IpAddress", "EntityId", "EntityName", "CreatedDate") VALUES (13, 'admin', 'AdminLoginFailed', 'AdminAuth', 'Failed login attempt', '::1', NULL, NULL, '2026-10-30 16:43:18.021611');
INSERT INTO public."tbl_AdminActivity" ("Id", "Username", "ActivityType", "Module", "Description", "IpAddress", "EntityId", "EntityName", "CreatedDate") VALUES (14, 'admin', 'AdminLoginFailed', 'AdminAuth', 'Failed login attempt', '::1', NULL, NULL, '2026-10-30 16:43:21.653528');
INSERT INTO public."tbl_AdminActivity" ("Id", "Username", "ActivityType", "Module", "Description", "IpAddress", "EntityId", "EntityName", "CreatedDate") VALUES (15, 'admin', 'AdminLoginFailed', 'AdminAuth', 'Failed login attempt', '::1', NULL, NULL, '2026-10-30 16:43:22.409361');
INSERT INTO public."tbl_AdminActivity" ("Id", "Username", "ActivityType", "Module", "Description", "IpAddress", "EntityId", "EntityName", "CreatedDate") VALUES (16, 'admin', 'AdminLoginFailed', 'AdminAuth', 'Failed login attempt', '::1', NULL, NULL, '2026-10-30 16:43:23.081992');
INSERT INTO public."tbl_AdminActivity" ("Id", "Username", "ActivityType", "Module", "Description", "IpAddress", "EntityId", "EntityName", "CreatedDate") VALUES (17, 'admin', 'AdminLoginFailed', 'AdminAuth', 'Failed login attempt', '::1', NULL, NULL, '2026-10-30 16:43:23.680357');
INSERT INTO public."tbl_AdminActivity" ("Id", "Username", "ActivityType", "Module", "Description", "IpAddress", "EntityId", "EntityName", "CreatedDate") VALUES (18, 'admin', 'AdminLoginFailed', 'AdminAuth', 'Failed login attempt', '::1', NULL, NULL, '2026-10-30 16:43:24.213114');
INSERT INTO public."tbl_AdminActivity" ("Id", "Username", "ActivityType", "Module", "Description", "IpAddress", "EntityId", "EntityName", "CreatedDate") VALUES (19, 'admin', 'AdminLoginFailed', 'AdminAuth', 'Failed login attempt', '::1', NULL, NULL, '2026-10-30 16:43:24.809386');
INSERT INTO public."tbl_AdminActivity" ("Id", "Username", "ActivityType", "Module", "Description", "IpAddress", "EntityId", "EntityName", "CreatedDate") VALUES (20, 'admin', 'AdminLoginFailed', 'AdminAuth', 'Failed login attempt', '::1', NULL, NULL, '2026-10-30 16:43:25.35136');
INSERT INTO public."tbl_AdminActivity" ("Id", "Username", "ActivityType", "Module", "Description", "IpAddress", "EntityId", "EntityName", "CreatedDate") VALUES (21, 'admin', 'AdminLoginFailed', 'AdminAuth', 'Failed login attempt', '::1', NULL, NULL, '2026-10-30 16:46:14.442629');
INSERT INTO public."tbl_AdminActivity" ("Id", "Username", "ActivityType", "Module", "Description", "IpAddress", "EntityId", "EntityName", "CreatedDate") VALUES (22, 'admin', 'AdminLoginSuccess', 'AdminAuth', 'Admin logged in', '::1', 1, 'Quản Trị Viên SmartEdu', '2026-10-30 17:29:52.622132');
INSERT INTO public."tbl_AdminActivity" ("Id", "Username", "ActivityType", "Module", "Description", "IpAddress", "EntityId", "EntityName", "CreatedDate") VALUES (23, 'admin', 'AdminLoginSuccess', 'AdminAuth', 'Admin logged in', '::1', 1, 'Quản Trị Viên SmartEdu', '2026-10-31 09:24:30.342655');
INSERT INTO public."tbl_AdminActivity" ("Id", "Username", "ActivityType", "Module", "Description", "IpAddress", "EntityId", "EntityName", "CreatedDate") VALUES (24, 'admin', 'AdminLoginSuccess', 'AdminAuth', 'Admin logged in', '::1', 1, 'Quản Trị Viên SmartEdu', '2026-10-31 10:07:25.366595');
INSERT INTO public."tbl_AdminActivity" ("Id", "Username", "ActivityType", "Module", "Description", "IpAddress", "EntityId", "EntityName", "CreatedDate") VALUES (25, 'Admin', 'Upload', 'Media', 'Uploaded 461423459_1092442759550842_7577709795000315908_n.jpg to /uploads/articles/461423459_1092442759550842_7577709795000315908_n_20261101055408_a44e9ed1.jpg', NULL, NULL, NULL, '2026-11-01 12:54:08.861343');
INSERT INTO public."tbl_AdminActivity" ("Id", "Username", "ActivityType", "Module", "Description", "IpAddress", "EntityId", "EntityName", "CreatedDate") VALUES (26, 'admin', 'AdminLoginSuccess', 'AdminAuth', 'Admin logged in', '::1', 1, 'Quản Trị Viên SmartEdu', '2026-11-01 13:10:11.696362');


--
-- TOC entry 5501 (class 0 OID 33770)
-- Dependencies: 264
-- Data for Name: tbl_ArticleCategoryMap; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5503 (class 0 OID 33777)
-- Dependencies: 266
-- Data for Name: tbl_ArticleLV1; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5505 (class 0 OID 33792)
-- Dependencies: 268
-- Data for Name: tbl_BannerSection; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5507 (class 0 OID 33803)
-- Dependencies: 270
-- Data for Name: tbl_Contact; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5509 (class 0 OID 33812)
-- Dependencies: 272
-- Data for Name: tbl_Document; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5510 (class 0 OID 33822)
-- Dependencies: 273
-- Data for Name: tbl_DocumentCategory; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5512 (class 0 OID 33832)
-- Dependencies: 275
-- Data for Name: tbl_DocumentFiles; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5515 (class 0 OID 33843)
-- Dependencies: 278
-- Data for Name: tbl_FooterColumn; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5517 (class 0 OID 33851)
-- Dependencies: 280
-- Data for Name: tbl_FooterConfig; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."tbl_FooterConfig" ("Id", "CompanyName", "Address", "Phone", "Hotline", "Email", "Website", "CopyrightText", "IsActive") VALUES (1, 'Trung Tâm Bồi Dưỡng Văn Hóa SmartEdu Academy', 'Cơ sở 1: Số 01 Đường Số 6 / Cơ sở 2: Số 17 Đường Chợ Lớn, P. Bình Phú, Q.6, TP.HCM', '028.3876.5432', '0906.716.727 - 0901.873.466', 'smartedu.academy.vn@gmail.com', 'https://smartedu.edu.vn', '© 2026 SmartEdu Academy. All rights reserved.', true);


--
-- TOC entry 5519 (class 0 OID 33860)
-- Dependencies: 282
-- Data for Name: tbl_FooterLink; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5521 (class 0 OID 33872)
-- Dependencies: 284
-- Data for Name: tbl_HomepageSection; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."tbl_HomepageSection" ("Id", "SectionCode", "Title", "SubTitle", "Content", "DisplayOrder", "IsActive") VALUES (1, 'FACULTY_HEADER', 'HỘI ĐỒNG GIẢNG HUẤN 100% ĐH SƯ PHẠM TP.HCM', 'NGƯỜI THẦY THẮP LỬA', 'Đội ngũ thầy cô tâm huyết, chuyên môn vững vàng, xuất thân từ các khoa Sư phạm Toán, Văn, Anh, KHTN trường ĐH Sư Phạm TP.HCM. Đồng hành kiên nhẫn cùng từng học sinh.', 1, true);


--
-- TOC entry 5523 (class 0 OID 33882)
-- Dependencies: 286
-- Data for Name: tbl_Language; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."tbl_Language" ("Id", "Code", "Name", "IsDefault", "DisplayOrder") VALUES (1, 'vi', 'Tiếng Việt', true, 1);
INSERT INTO public."tbl_Language" ("Id", "Code", "Name", "IsDefault", "DisplayOrder") VALUES (2, 'en', 'English', false, 2);


--
-- TOC entry 5525 (class 0 OID 33891)
-- Dependencies: 288
-- Data for Name: tbl_ModuleArticle; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."tbl_ModuleArticle" ("ModuleId", "ModuleName", "ModuleKey", "UrlFrontEnd", "DisplayOrder", "IsActive", "ParentId", "OnTopMenu", "Icon", "IsClickable", "TargetBlank") VALUES (1, 'TRANG CHỦ', 'trang-chu', '/', 1, true, NULL, true, 'bi bi-house-door', true, false);
INSERT INTO public."tbl_ModuleArticle" ("ModuleId", "ModuleName", "ModuleKey", "UrlFrontEnd", "DisplayOrder", "IsActive", "ParentId", "OnTopMenu", "Icon", "IsClickable", "TargetBlank") VALUES (2, 'GIỚI THIỆU', 'gioi-thieu', '/gioi-thieu', 2, true, NULL, true, NULL, true, false);
INSERT INTO public."tbl_ModuleArticle" ("ModuleId", "ModuleName", "ModuleKey", "UrlFrontEnd", "DisplayOrder", "IsActive", "ParentId", "OnTopMenu", "Icon", "IsClickable", "TargetBlank") VALUES (3, 'CHƯƠNG TRÌNH HỌC', 'chuong-trinh-hoc', '/chuong-trinh-hoc', 3, true, NULL, true, NULL, true, false);
INSERT INTO public."tbl_ModuleArticle" ("ModuleId", "ModuleName", "ModuleKey", "UrlFrontEnd", "DisplayOrder", "IsActive", "ParentId", "OnTopMenu", "Icon", "IsClickable", "TargetBlank") VALUES (4, 'BAN GIẢNG HUẤN', 'ban-giang-huan', '/ban-giang-huan', 4, true, NULL, true, NULL, true, false);
INSERT INTO public."tbl_ModuleArticle" ("ModuleId", "ModuleName", "ModuleKey", "UrlFrontEnd", "DisplayOrder", "IsActive", "ParentId", "OnTopMenu", "Icon", "IsClickable", "TargetBlank") VALUES (5, 'TIN TỨC', 'tin-tuc', '/tin-tuc', 5, true, NULL, true, NULL, true, false);
INSERT INTO public."tbl_ModuleArticle" ("ModuleId", "ModuleName", "ModuleKey", "UrlFrontEnd", "DisplayOrder", "IsActive", "ParentId", "OnTopMenu", "Icon", "IsClickable", "TargetBlank") VALUES (6, 'THƯ VIỆN MEDIA', 'thu-vien-media', '/thu-vien-media', 6, true, NULL, true, NULL, true, false);
INSERT INTO public."tbl_ModuleArticle" ("ModuleId", "ModuleName", "ModuleKey", "UrlFrontEnd", "DisplayOrder", "IsActive", "ParentId", "OnTopMenu", "Icon", "IsClickable", "TargetBlank") VALUES (7, 'LIÊN HỆ', 'lien-he', '/lien-he', 7, true, NULL, true, NULL, true, false);
INSERT INTO public."tbl_ModuleArticle" ("ModuleId", "ModuleName", "ModuleKey", "UrlFrontEnd", "DisplayOrder", "IsActive", "ParentId", "OnTopMenu", "Icon", "IsClickable", "TargetBlank") VALUES (8, 'Câu Chuyện SmartEdu', 'cau-chuyen-smartedu', '/gioi-thieu/cau-chuyen-smartedu', 1, true, 2, true, 'bi bi-book-half', true, false);
INSERT INTO public."tbl_ModuleArticle" ("ModuleId", "ModuleName", "ModuleKey", "UrlFrontEnd", "DisplayOrder", "IsActive", "ParentId", "OnTopMenu", "Icon", "IsClickable", "TargetBlank") VALUES (9, 'Hệ Giá Trị Cốt Lõi', 'he-gia-tri-cot-loi', '/gioi-thieu/he-gia-tri-cot-loi', 2, true, 2, true, 'bi bi-compass', true, false);
INSERT INTO public."tbl_ModuleArticle" ("ModuleId", "ModuleName", "ModuleKey", "UrlFrontEnd", "DisplayOrder", "IsActive", "ParentId", "OnTopMenu", "Icon", "IsClickable", "TargetBlank") VALUES (10, '4 Cam Kết Vàng', '4-cam-ket-vang', '/gioi-thieu/4-cam-ket-vang', 3, true, 2, true, 'bi bi-shield-check', true, false);
INSERT INTO public."tbl_ModuleArticle" ("ModuleId", "ModuleName", "ModuleKey", "UrlFrontEnd", "DisplayOrder", "IsActive", "ParentId", "OnTopMenu", "Icon", "IsClickable", "TargetBlank") VALUES (11, 'Thông Điệp Giảng Huấn', 'thong-diep-giang-huan', '/gioi-thieu/thong-diep-giang-huan', 4, true, 2, true, 'bi bi-feather', true, false);
INSERT INTO public."tbl_ModuleArticle" ("ModuleId", "ModuleName", "ModuleKey", "UrlFrontEnd", "DisplayOrder", "IsActive", "ParentId", "OnTopMenu", "Icon", "IsClickable", "TargetBlank") VALUES (12, 'Pháp Lý & Công Khai', 'phap-ly-cong-khai', '/gioi-thieu/phap-ly-cong-khai', 5, true, 2, true, 'bi bi-file-earmark-pdf', true, false);
INSERT INTO public."tbl_ModuleArticle" ("ModuleId", "ModuleName", "ModuleKey", "UrlFrontEnd", "DisplayOrder", "IsActive", "ParentId", "OnTopMenu", "Icon", "IsClickable", "TargetBlank") VALUES (13, 'KHỐI THCS (LỚP 6 - 9)', 'khoi-thcs', '/chuong-trinh-hoc/thcs', 1, true, 3, true, 'bi bi-journal-bookmark-fill', false, false);
INSERT INTO public."tbl_ModuleArticle" ("ModuleId", "ModuleName", "ModuleKey", "UrlFrontEnd", "DisplayOrder", "IsActive", "ParentId", "OnTopMenu", "Icon", "IsClickable", "TargetBlank") VALUES (14, 'KHỐI TUYỂN SINH 10 & CHUYÊN', 'khoi-tuyen-sinh-10', '/chuong-trinh-hoc/tuyen-sinh-10', 2, true, 3, true, 'bi bi-award-fill', false, false);
INSERT INTO public."tbl_ModuleArticle" ("ModuleId", "ModuleName", "ModuleKey", "UrlFrontEnd", "DisplayOrder", "IsActive", "ParentId", "OnTopMenu", "Icon", "IsClickable", "TargetBlank") VALUES (15, 'KHỐI THPT & LUYỆN THI ĐẠI HỌC', 'khoi-thpt', '/chuong-trinh-hoc/thpt', 3, true, 3, true, 'bi bi-mortarboard-fill', false, false);
INSERT INTO public."tbl_ModuleArticle" ("ModuleId", "ModuleName", "ModuleKey", "UrlFrontEnd", "DisplayOrder", "IsActive", "ParentId", "OnTopMenu", "Icon", "IsClickable", "TargetBlank") VALUES (16, 'Bồi Dưỡng Toán Lớp 6 - 9', 'boi-duong-toan-6-9', '/chuong-trinh-hoc/boi-duong-toan-6-9', 1, true, 13, true, NULL, true, false);
INSERT INTO public."tbl_ModuleArticle" ("ModuleId", "ModuleName", "ModuleKey", "UrlFrontEnd", "DisplayOrder", "IsActive", "ParentId", "OnTopMenu", "Icon", "IsClickable", "TargetBlank") VALUES (17, 'Ngữ Văn & Kỹ Năng Làm Văn', 'ngu-van-ky-nang-lam-van', '/chuong-trinh-hoc/ngu-van-ky-nang-lam-van', 2, true, 13, true, NULL, true, false);
INSERT INTO public."tbl_ModuleArticle" ("ModuleId", "ModuleName", "ModuleKey", "UrlFrontEnd", "DisplayOrder", "IsActive", "ParentId", "OnTopMenu", "Icon", "IsClickable", "TargetBlank") VALUES (18, 'Khoa Học Tự Nhiên (Lý - Hóa - Sinh)', 'khoa-hoc-tu-nhien', '/chuong-trinh-hoc/khoa-hoc-tu-nhien', 3, true, 13, true, NULL, true, false);
INSERT INTO public."tbl_ModuleArticle" ("ModuleId", "ModuleName", "ModuleKey", "UrlFrontEnd", "DisplayOrder", "IsActive", "ParentId", "OnTopMenu", "Icon", "IsClickable", "TargetBlank") VALUES (19, 'Tiếng Anh SGK & Nâng Cao', 'tieng-anh-sgk-nang-cao', '/chuong-trinh-hoc/tieng-anh-sgk-nang-cao', 4, true, 13, true, NULL, true, false);
INSERT INTO public."tbl_ModuleArticle" ("ModuleId", "ModuleName", "ModuleKey", "UrlFrontEnd", "DisplayOrder", "IsActive", "ParentId", "OnTopMenu", "Icon", "IsClickable", "TargetBlank") VALUES (20, 'Luyện Thi Tuyển Sinh 10 Công Lập', 'luyen-thi-10-cong-lap', '/chuong-trinh-hoc/luyen-thi-10-cong-lap', 1, true, 14, true, NULL, true, false);
INSERT INTO public."tbl_ModuleArticle" ("ModuleId", "ModuleName", "ModuleKey", "UrlFrontEnd", "DisplayOrder", "IsActive", "ParentId", "OnTopMenu", "Icon", "IsClickable", "TargetBlank") VALUES (21, 'Luyện Thi Vào Lớp 10 Chuyên', 'luyen-thi-10-chuyen', '/chuong-trinh-hoc/luyen-thi-10-chuyen', 2, true, 14, true, NULL, true, false);
INSERT INTO public."tbl_ModuleArticle" ("ModuleId", "ModuleName", "ModuleKey", "UrlFrontEnd", "DisplayOrder", "IsActive", "ParentId", "OnTopMenu", "Icon", "IsClickable", "TargetBlank") VALUES (22, 'Chiến Binh Bứt Phá Điểm 9+', 'chien-binh-but-pha-diem-9', '/chuong-trinh-hoc/chien-binh-but-pha-diem-9', 3, true, 14, true, NULL, true, false);
INSERT INTO public."tbl_ModuleArticle" ("ModuleId", "ModuleName", "ModuleKey", "UrlFrontEnd", "DisplayOrder", "IsActive", "ParentId", "OnTopMenu", "Icon", "IsClickable", "TargetBlank") VALUES (23, 'Bồi Dưỡng Toán - Lý - Hóa 10 - 12', 'boi-duong-toan-ly-hoa-10-12', '/chuong-trinh-hoc/boi-duong-toan-ly-hoa-10-12', 1, true, 15, true, NULL, true, false);
INSERT INTO public."tbl_ModuleArticle" ("ModuleId", "ModuleName", "ModuleKey", "UrlFrontEnd", "DisplayOrder", "IsActive", "ParentId", "OnTopMenu", "Icon", "IsClickable", "TargetBlank") VALUES (24, 'Luyện Thi ĐGNL ĐHQG TP.HCM', 'luyen-thi-dgnl-dhqg-tphcm', '/chuong-trinh-hoc/luyen-thi-dgnl-dhqg-tphcm', 2, true, 15, true, NULL, true, false);
INSERT INTO public."tbl_ModuleArticle" ("ModuleId", "ModuleName", "ModuleKey", "UrlFrontEnd", "DisplayOrder", "IsActive", "ParentId", "OnTopMenu", "Icon", "IsClickable", "TargetBlank") VALUES (25, 'Ôn Thi Tốt Nghiệp THPT Quốc Gia', 'on-thi-tot-nghiep-thpt', '/chuong-trinh-hoc/on-thi-tot-nghiep-thpt', 3, true, 15, true, NULL, true, false);


--
-- TOC entry 5527 (class 0 OID 33902)
-- Dependencies: 290
-- Data for Name: tbl_Role; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."tbl_Role" ("Id", "Name", "Description") VALUES (1, 'Admin', 'Quản trị viên hệ thống');
INSERT INTO public."tbl_Role" ("Id", "Name", "Description") VALUES (2, 'User', 'Người dùng thông thường');


--
-- TOC entry 5529 (class 0 OID 33908)
-- Dependencies: 292
-- Data for Name: tbl_Slider; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5531 (class 0 OID 33918)
-- Dependencies: 294
-- Data for Name: tbl_SocialNetwork; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5533 (class 0 OID 33929)
-- Dependencies: 296
-- Data for Name: tbl_User; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."tbl_User" ("Id", "Username", "PasswordHash", "FullName", "Email", "Phone", "Roles", "Status", "CreatedDate", "LastLogin") VALUES (1, 'admin', 'AQAAAAIAAYagAAAAEDfBl2Bw44gTvM7b/QVIdK9ob0/r4cK+JI3xIS4kuc4cM/vVFQF1HEC0p3XR3QLkBQ==', 'Quản Trị Viên SmartEdu', 'admin@smartedu.edu.vn', NULL, 1, true, '2026-10-26 08:14:13.634465', NULL);


--
-- TOC entry 5535 (class 0 OID 33940)
-- Dependencies: 298
-- Data for Name: tbl_VanPhongchinhanh; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5584 (class 0 OID 0)
-- Dependencies: 221
-- Name: Albums_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Albums_Id_seq"', 1, false);


--
-- TOC entry 5585 (class 0 OID 0)
-- Dependencies: 223
-- Name: Branches_BranchId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Branches_BranchId_seq"', 2, true);


--
-- TOC entry 5586 (class 0 OID 0)
-- Dependencies: 225
-- Name: CategoryArticle_CategoryId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CategoryArticle_CategoryId_seq"', 1, false);


--
-- TOC entry 5587 (class 0 OID 0)
-- Dependencies: 227
-- Name: City_CityId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."City_CityId_seq"', 1, false);


--
-- TOC entry 5588 (class 0 OID 0)
-- Dependencies: 229
-- Name: ContactInfo_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ContactInfo_Id_seq"', 1, true);


--
-- TOC entry 5589 (class 0 OID 0)
-- Dependencies: 231
-- Name: ContactMessages_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ContactMessages_Id_seq"', 1, false);


--
-- TOC entry 5590 (class 0 OID 0)
-- Dependencies: 233
-- Name: CourseSyllabus_SyllabusId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CourseSyllabus_SyllabusId_seq"', 4, true);


--
-- TOC entry 5591 (class 0 OID 0)
-- Dependencies: 235
-- Name: Courses_CourseId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Courses_CourseId_seq"', 5, true);


--
-- TOC entry 5592 (class 0 OID 0)
-- Dependencies: 237
-- Name: Dealership_DealershipId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Dealership_DealershipId_seq"', 1, false);


--
-- TOC entry 5593 (class 0 OID 0)
-- Dependencies: 239
-- Name: District_DistrictId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."District_DistrictId_seq"', 1, false);


--
-- TOC entry 5594 (class 0 OID 0)
-- Dependencies: 241
-- Name: Enrollments_EnrollmentId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Enrollments_EnrollmentId_seq"', 1, false);


--
-- TOC entry 5595 (class 0 OID 0)
-- Dependencies: 243
-- Name: ExtendedProperty_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ExtendedProperty_Id_seq"', 1, false);


--
-- TOC entry 5596 (class 0 OID 0)
-- Dependencies: 245
-- Name: GalleryConfig_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."GalleryConfig_Id_seq"', 1, false);


--
-- TOC entry 5597 (class 0 OID 0)
-- Dependencies: 247
-- Name: Logo_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Logo_Id_seq"', 1, false);


--
-- TOC entry 5598 (class 0 OID 0)
-- Dependencies: 249
-- Name: Medias_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Medias_Id_seq"', 1, false);


--
-- TOC entry 5599 (class 0 OID 0)
-- Dependencies: 252
-- Name: ProductImages_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ProductImages_Id_seq"', 1, false);


--
-- TOC entry 5600 (class 0 OID 0)
-- Dependencies: 254
-- Name: ProductTags_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ProductTags_Id_seq"', 1, false);


--
-- TOC entry 5601 (class 0 OID 0)
-- Dependencies: 255
-- Name: Product_ProductId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Product_ProductId_seq"', 1, false);


--
-- TOC entry 5602 (class 0 OID 0)
-- Dependencies: 257
-- Name: Tags_TagId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Tags_TagId_seq"', 1, false);


--
-- TOC entry 5603 (class 0 OID 0)
-- Dependencies: 259
-- Name: TeacherCourses_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."TeacherCourses_Id_seq"', 2, true);


--
-- TOC entry 5604 (class 0 OID 0)
-- Dependencies: 261
-- Name: Teachers_TeacherId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Teachers_TeacherId_seq"', 4, true);


--
-- TOC entry 5605 (class 0 OID 0)
-- Dependencies: 263
-- Name: tbl_AdminActivity_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."tbl_AdminActivity_Id_seq"', 26, true);


--
-- TOC entry 5606 (class 0 OID 0)
-- Dependencies: 265
-- Name: tbl_ArticleCategoryMap_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."tbl_ArticleCategoryMap_Id_seq"', 1, false);


--
-- TOC entry 5607 (class 0 OID 0)
-- Dependencies: 267
-- Name: tbl_ArticleLV1_ArticleId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."tbl_ArticleLV1_ArticleId_seq"', 1, false);


--
-- TOC entry 5608 (class 0 OID 0)
-- Dependencies: 269
-- Name: tbl_BannerSection_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."tbl_BannerSection_Id_seq"', 1, false);


--
-- TOC entry 5609 (class 0 OID 0)
-- Dependencies: 271
-- Name: tbl_Contact_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."tbl_Contact_Id_seq"', 1, false);


--
-- TOC entry 5610 (class 0 OID 0)
-- Dependencies: 274
-- Name: tbl_DocumentCategory_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."tbl_DocumentCategory_Id_seq"', 1, false);


--
-- TOC entry 5611 (class 0 OID 0)
-- Dependencies: 276
-- Name: tbl_DocumentFiles_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."tbl_DocumentFiles_Id_seq"', 1, false);


--
-- TOC entry 5612 (class 0 OID 0)
-- Dependencies: 277
-- Name: tbl_Document_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."tbl_Document_Id_seq"', 1, false);


--
-- TOC entry 5613 (class 0 OID 0)
-- Dependencies: 279
-- Name: tbl_FooterColumn_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."tbl_FooterColumn_Id_seq"', 1, false);


--
-- TOC entry 5614 (class 0 OID 0)
-- Dependencies: 281
-- Name: tbl_FooterConfig_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."tbl_FooterConfig_Id_seq"', 1, true);


--
-- TOC entry 5615 (class 0 OID 0)
-- Dependencies: 283
-- Name: tbl_FooterLink_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."tbl_FooterLink_Id_seq"', 1, false);


--
-- TOC entry 5616 (class 0 OID 0)
-- Dependencies: 285
-- Name: tbl_HomepageSection_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."tbl_HomepageSection_Id_seq"', 1, true);


--
-- TOC entry 5617 (class 0 OID 0)
-- Dependencies: 287
-- Name: tbl_Language_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."tbl_Language_Id_seq"', 2, true);


--
-- TOC entry 5618 (class 0 OID 0)
-- Dependencies: 289
-- Name: tbl_ModuleArticle_ModuleId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."tbl_ModuleArticle_ModuleId_seq"', 25, true);


--
-- TOC entry 5619 (class 0 OID 0)
-- Dependencies: 291
-- Name: tbl_Role_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."tbl_Role_Id_seq"', 2, true);


--
-- TOC entry 5620 (class 0 OID 0)
-- Dependencies: 293
-- Name: tbl_Slider_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."tbl_Slider_Id_seq"', 1, false);


--
-- TOC entry 5621 (class 0 OID 0)
-- Dependencies: 295
-- Name: tbl_SocialNetwork_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."tbl_SocialNetwork_Id_seq"', 1, false);


--
-- TOC entry 5622 (class 0 OID 0)
-- Dependencies: 297
-- Name: tbl_User_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."tbl_User_Id_seq"', 1, true);


--
-- TOC entry 5623 (class 0 OID 0)
-- Dependencies: 299
-- Name: tbl_VanPhongchinhanh_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."tbl_VanPhongchinhanh_Id_seq"', 1, false);


--
-- TOC entry 5180 (class 2606 OID 33989)
-- Name: Albums Albums_Slug_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Albums"
    ADD CONSTRAINT "Albums_Slug_key" UNIQUE ("Slug");


--
-- TOC entry 5182 (class 2606 OID 33991)
-- Name: Albums Albums_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Albums"
    ADD CONSTRAINT "Albums_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 5184 (class 2606 OID 33993)
-- Name: Branches Branches_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Branches"
    ADD CONSTRAINT "Branches_pkey" PRIMARY KEY ("BranchId");


--
-- TOC entry 5187 (class 2606 OID 33995)
-- Name: CategoryArticle CategoryArticle_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CategoryArticle"
    ADD CONSTRAINT "CategoryArticle_pkey" PRIMARY KEY ("CategoryId");


--
-- TOC entry 5190 (class 2606 OID 33997)
-- Name: City City_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."City"
    ADD CONSTRAINT "City_pkey" PRIMARY KEY ("CityId");


--
-- TOC entry 5192 (class 2606 OID 33999)
-- Name: ContactInfo ContactInfo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ContactInfo"
    ADD CONSTRAINT "ContactInfo_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 5195 (class 2606 OID 34001)
-- Name: ContactMessages ContactMessages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ContactMessages"
    ADD CONSTRAINT "ContactMessages_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 5197 (class 2606 OID 34003)
-- Name: CourseSyllabus CourseSyllabus_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CourseSyllabus"
    ADD CONSTRAINT "CourseSyllabus_pkey" PRIMARY KEY ("SyllabusId");


--
-- TOC entry 5200 (class 2606 OID 34005)
-- Name: Courses Courses_Slug_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Courses"
    ADD CONSTRAINT "Courses_Slug_key" UNIQUE ("Slug");


--
-- TOC entry 5202 (class 2606 OID 34007)
-- Name: Courses Courses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Courses"
    ADD CONSTRAINT "Courses_pkey" PRIMARY KEY ("CourseId");


--
-- TOC entry 5207 (class 2606 OID 34009)
-- Name: Dealership Dealership_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Dealership"
    ADD CONSTRAINT "Dealership_pkey" PRIMARY KEY ("DealershipId");


--
-- TOC entry 5209 (class 2606 OID 34011)
-- Name: District District_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."District"
    ADD CONSTRAINT "District_pkey" PRIMARY KEY ("DistrictId");


--
-- TOC entry 5211 (class 2606 OID 34013)
-- Name: Enrollments Enrollments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Enrollments"
    ADD CONSTRAINT "Enrollments_pkey" PRIMARY KEY ("EnrollmentId");


--
-- TOC entry 5215 (class 2606 OID 34015)
-- Name: ExtendedProperty ExtendedProperty_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ExtendedProperty"
    ADD CONSTRAINT "ExtendedProperty_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 5217 (class 2606 OID 34017)
-- Name: GalleryConfig GalleryConfig_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GalleryConfig"
    ADD CONSTRAINT "GalleryConfig_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 5219 (class 2606 OID 34019)
-- Name: Logo Logo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Logo"
    ADD CONSTRAINT "Logo_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 5221 (class 2606 OID 34021)
-- Name: Medias Medias_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Medias"
    ADD CONSTRAINT "Medias_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 5225 (class 2606 OID 34023)
-- Name: ProductImages ProductImages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductImages"
    ADD CONSTRAINT "ProductImages_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 5227 (class 2606 OID 34025)
-- Name: ProductTags ProductTags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductTags"
    ADD CONSTRAINT "ProductTags_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 5223 (class 2606 OID 34027)
-- Name: Product Product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("ProductId");


--
-- TOC entry 5229 (class 2606 OID 34029)
-- Name: Tags Tags_Slug_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tags"
    ADD CONSTRAINT "Tags_Slug_key" UNIQUE ("Slug");


--
-- TOC entry 5231 (class 2606 OID 34031)
-- Name: Tags Tags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tags"
    ADD CONSTRAINT "Tags_pkey" PRIMARY KEY ("TagId");


--
-- TOC entry 5233 (class 2606 OID 34033)
-- Name: TeacherCourses TeacherCourses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TeacherCourses"
    ADD CONSTRAINT "TeacherCourses_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 5237 (class 2606 OID 34035)
-- Name: Teachers Teachers_Slug_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Teachers"
    ADD CONSTRAINT "Teachers_Slug_key" UNIQUE ("Slug");


--
-- TOC entry 5239 (class 2606 OID 34037)
-- Name: Teachers Teachers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Teachers"
    ADD CONSTRAINT "Teachers_pkey" PRIMARY KEY ("TeacherId");


--
-- TOC entry 5243 (class 2606 OID 34039)
-- Name: tbl_AdminActivity tbl_AdminActivity_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbl_AdminActivity"
    ADD CONSTRAINT "tbl_AdminActivity_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 5245 (class 2606 OID 34041)
-- Name: tbl_ArticleCategoryMap tbl_ArticleCategoryMap_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbl_ArticleCategoryMap"
    ADD CONSTRAINT "tbl_ArticleCategoryMap_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 5249 (class 2606 OID 34043)
-- Name: tbl_ArticleLV1 tbl_ArticleLV1_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbl_ArticleLV1"
    ADD CONSTRAINT "tbl_ArticleLV1_pkey" PRIMARY KEY ("ArticleId");


--
-- TOC entry 5251 (class 2606 OID 34045)
-- Name: tbl_BannerSection tbl_BannerSection_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbl_BannerSection"
    ADD CONSTRAINT "tbl_BannerSection_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 5253 (class 2606 OID 34047)
-- Name: tbl_Contact tbl_Contact_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbl_Contact"
    ADD CONSTRAINT "tbl_Contact_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 5257 (class 2606 OID 34049)
-- Name: tbl_DocumentCategory tbl_DocumentCategory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbl_DocumentCategory"
    ADD CONSTRAINT "tbl_DocumentCategory_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 5259 (class 2606 OID 34051)
-- Name: tbl_DocumentFiles tbl_DocumentFiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbl_DocumentFiles"
    ADD CONSTRAINT "tbl_DocumentFiles_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 5255 (class 2606 OID 34053)
-- Name: tbl_Document tbl_Document_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbl_Document"
    ADD CONSTRAINT "tbl_Document_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 5261 (class 2606 OID 34055)
-- Name: tbl_FooterColumn tbl_FooterColumn_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbl_FooterColumn"
    ADD CONSTRAINT "tbl_FooterColumn_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 5263 (class 2606 OID 34057)
-- Name: tbl_FooterConfig tbl_FooterConfig_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbl_FooterConfig"
    ADD CONSTRAINT "tbl_FooterConfig_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 5265 (class 2606 OID 34059)
-- Name: tbl_FooterLink tbl_FooterLink_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbl_FooterLink"
    ADD CONSTRAINT "tbl_FooterLink_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 5267 (class 2606 OID 34061)
-- Name: tbl_HomepageSection tbl_HomepageSection_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbl_HomepageSection"
    ADD CONSTRAINT "tbl_HomepageSection_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 5269 (class 2606 OID 34063)
-- Name: tbl_Language tbl_Language_Code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbl_Language"
    ADD CONSTRAINT "tbl_Language_Code_key" UNIQUE ("Code");


--
-- TOC entry 5271 (class 2606 OID 34065)
-- Name: tbl_Language tbl_Language_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbl_Language"
    ADD CONSTRAINT "tbl_Language_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 5273 (class 2606 OID 34067)
-- Name: tbl_ModuleArticle tbl_ModuleArticle_ModuleKey_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbl_ModuleArticle"
    ADD CONSTRAINT "tbl_ModuleArticle_ModuleKey_key" UNIQUE ("ModuleKey");


--
-- TOC entry 5275 (class 2606 OID 34069)
-- Name: tbl_ModuleArticle tbl_ModuleArticle_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbl_ModuleArticle"
    ADD CONSTRAINT "tbl_ModuleArticle_pkey" PRIMARY KEY ("ModuleId");


--
-- TOC entry 5277 (class 2606 OID 34071)
-- Name: tbl_Role tbl_Role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbl_Role"
    ADD CONSTRAINT "tbl_Role_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 5280 (class 2606 OID 34073)
-- Name: tbl_Slider tbl_Slider_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbl_Slider"
    ADD CONSTRAINT "tbl_Slider_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 5282 (class 2606 OID 34075)
-- Name: tbl_SocialNetwork tbl_SocialNetwork_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbl_SocialNetwork"
    ADD CONSTRAINT "tbl_SocialNetwork_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 5284 (class 2606 OID 34077)
-- Name: tbl_User tbl_User_Username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbl_User"
    ADD CONSTRAINT "tbl_User_Username_key" UNIQUE ("Username");


--
-- TOC entry 5286 (class 2606 OID 34079)
-- Name: tbl_User tbl_User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbl_User"
    ADD CONSTRAINT "tbl_User_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 5288 (class 2606 OID 34081)
-- Name: tbl_VanPhongchinhanh tbl_VanPhongchinhanh_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbl_VanPhongchinhanh"
    ADD CONSTRAINT "tbl_VanPhongchinhanh_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 5246 (class 1259 OID 34082)
-- Name: idx_article_ispublic; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_article_ispublic ON public."tbl_ArticleLV1" USING btree ("Ispublic");


--
-- TOC entry 5247 (class 1259 OID 34083)
-- Name: idx_article_seotitle; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_article_seotitle ON public."tbl_ArticleLV1" USING btree ("SEOTitle");


--
-- TOC entry 5185 (class 1259 OID 34084)
-- Name: idx_branches_active; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_branches_active ON public."Branches" USING btree ("IsActive");


--
-- TOC entry 5188 (class 1259 OID 34085)
-- Name: idx_categoryarticle_seo; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_categoryarticle_seo ON public."CategoryArticle" USING btree ("SEOTitle");


--
-- TOC entry 5193 (class 1259 OID 34086)
-- Name: idx_contactinfo_active; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_contactinfo_active ON public."ContactInfo" USING btree ("IsActive");


--
-- TOC entry 5203 (class 1259 OID 34087)
-- Name: idx_courses_featured; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_courses_featured ON public."Courses" USING btree ("IsFeatured");


--
-- TOC entry 5204 (class 1259 OID 34088)
-- Name: idx_courses_gradelevel; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_courses_gradelevel ON public."Courses" USING btree ("GradeLevel");


--
-- TOC entry 5205 (class 1259 OID 34089)
-- Name: idx_courses_subject; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_courses_subject ON public."Courses" USING btree ("Subject");


--
-- TOC entry 5198 (class 1259 OID 34090)
-- Name: idx_coursesyllabus_courseid; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_coursesyllabus_courseid ON public."CourseSyllabus" USING btree ("CourseId");


--
-- TOC entry 5212 (class 1259 OID 34091)
-- Name: idx_enrollments_createddate; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_enrollments_createddate ON public."Enrollments" USING btree ("CreatedDate");


--
-- TOC entry 5213 (class 1259 OID 34092)
-- Name: idx_enrollments_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_enrollments_status ON public."Enrollments" USING btree ("Status");


--
-- TOC entry 5278 (class 1259 OID 34093)
-- Name: idx_slider_public; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_slider_public ON public."tbl_Slider" USING btree ("IsPublic", "Indexd");


--
-- TOC entry 5234 (class 1259 OID 34094)
-- Name: idx_teachercourses_courseid; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_teachercourses_courseid ON public."TeacherCourses" USING btree ("CourseId");


--
-- TOC entry 5235 (class 1259 OID 34095)
-- Name: idx_teachercourses_teacherid; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_teachercourses_teacherid ON public."TeacherCourses" USING btree ("TeacherId");


--
-- TOC entry 5240 (class 1259 OID 34096)
-- Name: idx_teachers_featured; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_teachers_featured ON public."Teachers" USING btree ("IsFeatured");


--
-- TOC entry 5241 (class 1259 OID 34097)
-- Name: idx_teachers_subject; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_teachers_subject ON public."Teachers" USING btree ("Subject");


--
-- TOC entry 5289 (class 2606 OID 34098)
-- Name: CategoryArticle CategoryArticle_LanguageCode_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CategoryArticle"
    ADD CONSTRAINT "CategoryArticle_LanguageCode_fkey" FOREIGN KEY ("LanguageCode") REFERENCES public."tbl_Language"("Code") ON DELETE SET NULL;


--
-- TOC entry 5290 (class 2606 OID 34103)
-- Name: CourseSyllabus CourseSyllabus_CourseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CourseSyllabus"
    ADD CONSTRAINT "CourseSyllabus_CourseId_fkey" FOREIGN KEY ("CourseId") REFERENCES public."Courses"("CourseId") ON DELETE CASCADE;


--
-- TOC entry 5291 (class 2606 OID 34108)
-- Name: Dealership Dealership_DistrictId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Dealership"
    ADD CONSTRAINT "Dealership_DistrictId_fkey" FOREIGN KEY ("DistrictId") REFERENCES public."District"("DistrictId") ON DELETE SET NULL;


--
-- TOC entry 5292 (class 2606 OID 34113)
-- Name: District District_CityId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."District"
    ADD CONSTRAINT "District_CityId_fkey" FOREIGN KEY ("CityId") REFERENCES public."City"("CityId") ON DELETE CASCADE;


--
-- TOC entry 5293 (class 2606 OID 34118)
-- Name: Enrollments Enrollments_BranchId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Enrollments"
    ADD CONSTRAINT "Enrollments_BranchId_fkey" FOREIGN KEY ("BranchId") REFERENCES public."Branches"("BranchId") ON DELETE SET NULL;


--
-- TOC entry 5294 (class 2606 OID 34123)
-- Name: Enrollments Enrollments_CourseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Enrollments"
    ADD CONSTRAINT "Enrollments_CourseId_fkey" FOREIGN KEY ("CourseId") REFERENCES public."Courses"("CourseId") ON DELETE SET NULL;


--
-- TOC entry 5295 (class 2606 OID 34128)
-- Name: ExtendedProperty ExtendedProperty_ProductId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ExtendedProperty"
    ADD CONSTRAINT "ExtendedProperty_ProductId_fkey" FOREIGN KEY ("ProductId") REFERENCES public."Product"("ProductId") ON DELETE CASCADE;


--
-- TOC entry 5296 (class 2606 OID 34133)
-- Name: Medias Medias_AlbumId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Medias"
    ADD CONSTRAINT "Medias_AlbumId_fkey" FOREIGN KEY ("AlbumId") REFERENCES public."Albums"("Id") ON DELETE CASCADE;


--
-- TOC entry 5297 (class 2606 OID 34138)
-- Name: ProductImages ProductImages_ProductId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductImages"
    ADD CONSTRAINT "ProductImages_ProductId_fkey" FOREIGN KEY ("ProductId") REFERENCES public."Product"("ProductId") ON DELETE CASCADE;


--
-- TOC entry 5298 (class 2606 OID 34143)
-- Name: ProductTags ProductTags_ProductId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductTags"
    ADD CONSTRAINT "ProductTags_ProductId_fkey" FOREIGN KEY ("ProductId") REFERENCES public."Product"("ProductId") ON DELETE CASCADE;


--
-- TOC entry 5299 (class 2606 OID 34148)
-- Name: ProductTags ProductTags_TagId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductTags"
    ADD CONSTRAINT "ProductTags_TagId_fkey" FOREIGN KEY ("TagId") REFERENCES public."Tags"("TagId") ON DELETE CASCADE;


--
-- TOC entry 5300 (class 2606 OID 34153)
-- Name: TeacherCourses TeacherCourses_CourseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TeacherCourses"
    ADD CONSTRAINT "TeacherCourses_CourseId_fkey" FOREIGN KEY ("CourseId") REFERENCES public."Courses"("CourseId") ON DELETE CASCADE;


--
-- TOC entry 5301 (class 2606 OID 34158)
-- Name: TeacherCourses TeacherCourses_TeacherId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TeacherCourses"
    ADD CONSTRAINT "TeacherCourses_TeacherId_fkey" FOREIGN KEY ("TeacherId") REFERENCES public."Teachers"("TeacherId") ON DELETE CASCADE;


--
-- TOC entry 5302 (class 2606 OID 34163)
-- Name: tbl_ArticleCategoryMap tbl_ArticleCategoryMap_ArticleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbl_ArticleCategoryMap"
    ADD CONSTRAINT "tbl_ArticleCategoryMap_ArticleId_fkey" FOREIGN KEY ("ArticleId") REFERENCES public."tbl_ArticleLV1"("ArticleId") ON DELETE CASCADE;


--
-- TOC entry 5303 (class 2606 OID 34168)
-- Name: tbl_ArticleCategoryMap tbl_ArticleCategoryMap_CategoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbl_ArticleCategoryMap"
    ADD CONSTRAINT "tbl_ArticleCategoryMap_CategoryId_fkey" FOREIGN KEY ("CategoryId") REFERENCES public."CategoryArticle"("CategoryId") ON DELETE CASCADE;


--
-- TOC entry 5304 (class 2606 OID 34173)
-- Name: tbl_ArticleLV1 tbl_ArticleLV1_LanguageCode_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbl_ArticleLV1"
    ADD CONSTRAINT "tbl_ArticleLV1_LanguageCode_fkey" FOREIGN KEY ("LanguageCode") REFERENCES public."tbl_Language"("Code") ON DELETE SET NULL;


--
-- TOC entry 5305 (class 2606 OID 34178)
-- Name: tbl_ArticleLV1 tbl_ArticleLV1_ModuleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbl_ArticleLV1"
    ADD CONSTRAINT "tbl_ArticleLV1_ModuleId_fkey" FOREIGN KEY ("ModuleId") REFERENCES public."tbl_ModuleArticle"("ModuleId") ON DELETE SET NULL;


--
-- TOC entry 5307 (class 2606 OID 34183)
-- Name: tbl_DocumentFiles tbl_DocumentFiles_DocumentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbl_DocumentFiles"
    ADD CONSTRAINT "tbl_DocumentFiles_DocumentId_fkey" FOREIGN KEY ("DocumentId") REFERENCES public."tbl_Document"("Id") ON DELETE CASCADE;


--
-- TOC entry 5306 (class 2606 OID 34188)
-- Name: tbl_Document tbl_Document_CategoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbl_Document"
    ADD CONSTRAINT "tbl_Document_CategoryId_fkey" FOREIGN KEY ("CategoryId") REFERENCES public."tbl_DocumentCategory"("Id") ON DELETE SET NULL;


--
-- TOC entry 5308 (class 2606 OID 34193)
-- Name: tbl_FooterLink tbl_FooterLink_ColumnId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbl_FooterLink"
    ADD CONSTRAINT "tbl_FooterLink_ColumnId_fkey" FOREIGN KEY ("ColumnId") REFERENCES public."tbl_FooterColumn"("Id") ON DELETE CASCADE;


--
-- TOC entry 5309 (class 2606 OID 34198)
-- Name: tbl_User tbl_User_Roles_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbl_User"
    ADD CONSTRAINT "tbl_User_Roles_fkey" FOREIGN KEY ("Roles") REFERENCES public."tbl_Role"("Id") ON DELETE SET NULL;


-- Completed on 2026-11-03 17:41:45

--
-- PostgreSQL database dump complete
--

\unrestrict EVJgCLP54J08RKABAX40RmI9d1xDBT3qLu5bJjcAmEyUWhTtiICcSP9q4cU8xkb

