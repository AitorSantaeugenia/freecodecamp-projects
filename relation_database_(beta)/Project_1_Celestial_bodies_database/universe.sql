--
-- PostgreSQL database dump
--

-- Dumped from database version 12.9 (Ubuntu 12.9-2.pgdg20.04+1)
-- Dumped by pg_dump version 12.9 (Ubuntu 12.9-2.pgdg20.04+1)

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

DROP DATABASE universe;
--
-- Name: universe; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE universe WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE universe OWNER TO freecodecamp;

\connect universe

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: asteroids; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.asteroids (
    asteroids_id integer NOT NULL,
    name character varying(20) NOT NULL,
    discovered_year integer
);


ALTER TABLE public.asteroids OWNER TO freecodecamp;

--
-- Name: asteroids_asteroid_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.asteroids_asteroid_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.asteroids_asteroid_id_seq OWNER TO freecodecamp;

--
-- Name: asteroids_asteroid_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.asteroids_asteroid_id_seq OWNED BY public.asteroids.asteroids_id;


--
-- Name: galaxy; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.galaxy (
    galaxy_id integer NOT NULL,
    name character varying(30) NOT NULL,
    age integer,
    description text,
    galaxy_type character varying(20),
    constellation character varying(20)
);


ALTER TABLE public.galaxy OWNER TO freecodecamp;

--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.galaxy_galaxy_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.galaxy_galaxy_id_seq OWNER TO freecodecamp;

--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.galaxy_galaxy_id_seq OWNED BY public.galaxy.galaxy_id;


--
-- Name: moon; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.moon (
    moon_id integer NOT NULL,
    name character varying(30) NOT NULL,
    discover_year integer,
    description text,
    is_spherical boolean
);


ALTER TABLE public.moon OWNER TO freecodecamp;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.moon_moon_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.moon_moon_id_seq OWNER TO freecodecamp;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.moon_moon_id_seq OWNED BY public.moon.moon_id;


--
-- Name: planet; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.planet (
    planet_id integer NOT NULL,
    name character varying(30) NOT NULL,
    description text,
    age_in_millions_of_years integer,
    distance_from_earth numeric(10,2),
    has_life boolean,
    is_spherical boolean,
    planet_type character varying(20)
);


ALTER TABLE public.planet OWNER TO freecodecamp;

--
-- Name: planet_planet_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.planet_planet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.planet_planet_id_seq OWNER TO freecodecamp;

--
-- Name: planet_planet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.planet_planet_id_seq OWNED BY public.planet.planet_id;


--
-- Name: star; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.star (
    star_id integer NOT NULL,
    name character varying(30) NOT NULL,
    age integer,
    description text,
    is_spherical boolean,
    galaxy_id integer
);


ALTER TABLE public.star OWNER TO freecodecamp;

--
-- Name: star_star_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.star_star_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.star_star_id_seq OWNER TO freecodecamp;

--
-- Name: star_star_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.star_star_id_seq OWNED BY public.star.star_id;


--
-- Name: asteroids asteroids_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.asteroids ALTER COLUMN asteroids_id SET DEFAULT nextval('public.asteroids_asteroid_id_seq'::regclass);


--
-- Name: galaxy galaxy_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy ALTER COLUMN galaxy_id SET DEFAULT nextval('public.galaxy_galaxy_id_seq'::regclass);


--
-- Name: moon moon_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon ALTER COLUMN moon_id SET DEFAULT nextval('public.moon_moon_id_seq'::regclass);


--
-- Name: planet planet_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet ALTER COLUMN planet_id SET DEFAULT nextval('public.planet_planet_id_seq'::regclass);


--
-- Name: star star_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star ALTER COLUMN star_id SET DEFAULT nextval('public.star_star_id_seq'::regclass);


--
-- Data for Name: asteroids; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.asteroids VALUES (1, 'Vesta', 1807);
INSERT INTO public.asteroids VALUES (2, 'Pallas', 1802);
INSERT INTO public.asteroids VALUES (3, 'Hygiea', 1849);


--
-- Data for Name: galaxy; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.galaxy VALUES (1, 'Andromeda', 9999, 'Andromeda gets its name from the area of the sky in which it appears, the constellation of andromeda', 'Spiral', 'Andromeda');
INSERT INTO public.galaxy VALUES (2, 'Antennae', 9999, 'It looks like an insects antennae', 'Spiral', 'Corvus');
INSERT INTO public.galaxy VALUES (3, 'Backward', 9999, 'It appears to rotate backwards', 'Spiral', 'Centaurus');
INSERT INTO public.galaxy VALUES (4, 'Black eye', 9999, 'It hasa spectacular dark band of absorbing dust in front of the galaxys nucleous.', 'Spiral', 'Coma berenices');
INSERT INTO public.galaxy VALUES (5, 'Bodes Galaxy', 9999, 'Named after who discovered it Johann Elert Bode', 'Spiral', 'Ursa major');
INSERT INTO public.galaxy VALUES (6, 'Butterfly', 9999, 'Looks like a butterfly', 'Spiral', 'Virgo');
INSERT INTO public.galaxy VALUES (7, 'Cartwheel', 9999, 'Its visual appearance is similar to that of a spoked cartwheel.', 'Spiral', 'Sculptor');
INSERT INTO public.galaxy VALUES (8, 'Circinus', 9999, 'Named after the constellation it is located in.', 'Spiral', 'Circinus');


--
-- Data for Name: moon; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.moon VALUES (1, 'Moon', 0, 'Earth satellite', true);
INSERT INTO public.moon VALUES (2, 'Phobos', 1877, 'Mars satellite', true);
INSERT INTO public.moon VALUES (3, 'Deimos', 1877, 'Mars satellite', true);
INSERT INTO public.moon VALUES (4, 'Io', 1610, 'Jupiter satellite', true);
INSERT INTO public.moon VALUES (5, 'Europa', 1610, 'Jupiter satellite', true);
INSERT INTO public.moon VALUES (6, 'Ganymede', 1610, 'Jupiter satellite', true);
INSERT INTO public.moon VALUES (7, 'Callisto', 1610, 'Jupiter satellite', true);
INSERT INTO public.moon VALUES (8, 'Amaithea', 1892, 'Jupiter satellite', false);
INSERT INTO public.moon VALUES (9, 'Himalia', 1904, 'Jupiter satellite', true);
INSERT INTO public.moon VALUES (10, 'Elara', 1905, 'Jupiter satellite', true);
INSERT INTO public.moon VALUES (11, 'Pasiphae', 1908, 'Jupiter satellite', true);
INSERT INTO public.moon VALUES (12, 'Sinope', 1914, 'Jupiter satellite', true);
INSERT INTO public.moon VALUES (13, 'Lysithea', 1938, 'Jupiter satellite', true);
INSERT INTO public.moon VALUES (14, 'Carme', 1938, 'Jupiter satellite', true);
INSERT INTO public.moon VALUES (15, 'Anake', 1951, 'Jupiter satellite', true);
INSERT INTO public.moon VALUES (16, 'Leda', 1974, 'Jupiter satellite', true);
INSERT INTO public.moon VALUES (17, 'Thebe', 1979, 'Jupiter satellite', true);
INSERT INTO public.moon VALUES (18, 'Adrastea', 1979, 'Jupiter satellite', true);
INSERT INTO public.moon VALUES (19, 'Metis', 1979, 'Jupiter satellite', true);
INSERT INTO public.moon VALUES (20, 'Callirrhoe', 2000, 'Jupiter satellite', true);


--
-- Data for Name: planet; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.planet VALUES (1, 'Earth', 'Earth is the third planet from the sun and the fifth largest planet in the solar system with the highest density. It is ccurrently the only known location where life is present.', 45, 0.00, true, true, 'Terrestrial');
INSERT INTO public.planet VALUES (2, 'Mercury', 'Mercury is the closest place to the sun but, perhaps it have not the highest temperatures. Second densest plaent of the solar system. Similar to earth..', 45, 161.22, false, true, 'Terrestrial');
INSERT INTO public.planet VALUES (3, 'Venus', 'Venus is the second planet from the SUN and sixth-largest. Together with mercury, they are the only planets without a satellite', 45, 241.57, false, true, 'Terrestrial');
INSERT INTO public.planet VALUES (4, 'Mars', 'Mars is the fourth planet from teh sun and the second-samllest planet with a thin athmosphere, having the surface features of reminiscent both of the impact craters of the moon, and valleys, deserts and polar ice caps of Earth', 45, 156.98, false, true, 'Terrestrial');
INSERT INTO public.planet VALUES (5, 'Jupiter', 'Jupiter is the fifth planet fromthe sun and the largest planet of the solar system. Oldest planet in the solar system thus it was the first to take shape out of the remains of solar nebula.', 45, 625.21, false, true, 'Terrestrial');
INSERT INTO public.planet VALUES (6, 'Saturn', 'Saturn is the sixth planet from the sun, with the largest planetary rings in the solar system. Second largest after Jupiter..', 45, 13229.00, false, true, 'Terrestrial');
INSERT INTO public.planet VALUES (7, 'Uranus', 'Uranus is the seventh planet discovered in the solar system that also led to the discovery of the last planet Neptune they both referred to ice giants.', 45, 29269.00, false, true, 'Ice Giant');
INSERT INTO public.planet VALUES (8, 'Neptune', 'Neptune is the fourth largest and the farthest planet of the solar system with the most powerful winds speeds out of all planets', 45, 43431.00, false, true, 'Ice Giant');
INSERT INTO public.planet VALUES (9, 'Pluto', 'Pluto is a complex world of ice, mountains and frozen plains.', 45, 43431.00, false, true, 'Ice');
INSERT INTO public.planet VALUES (10, 'Ceres', 'Smaller than an asteroid.', 54, 455.00, false, false, 'Dwarf');
INSERT INTO public.planet VALUES (11, 'Makemake', 'It takes 310 Earth years for makemake to complete one orbit around our sun.', 54, 455.00, false, false, 'Dwarf');
INSERT INTO public.planet VALUES (12, 'Haumea', 'One of the fastest rotating objects in our solar system.', 54, 455.00, false, false, 'Dwarf');


--
-- Data for Name: star; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.star VALUES (1, 'Sirius', 9999, 'Scroching in Greek.', true, 1);
INSERT INTO public.star VALUES (2, 'Canopus', 9999, 'Pilot of the ship argos in Greek', true, 2);
INSERT INTO public.star VALUES (3, 'Arcturus', 9999, 'Guardian of the bear in greek.', true, 1);
INSERT INTO public.star VALUES (4, 'Rigel Kentaurus', 9999, 'Foot of the centaur in Greek', true, 3);
INSERT INTO public.star VALUES (5, 'Vega', 9999, 'Eagle or vulture in greek.', true, 5);
INSERT INTO public.star VALUES (6, 'Capella', 9999, 'Little shegoat in Greek', true, 3);


--
-- Name: asteroids_asteroid_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.asteroids_asteroid_id_seq', 1, false);


--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.galaxy_galaxy_id_seq', 1, false);


--
-- Name: moon_moon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.moon_moon_id_seq', 1, false);


--
-- Name: planet_planet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.planet_planet_id_seq', 1, false);


--
-- Name: star_star_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.star_star_id_seq', 1, false);


--
-- Name: asteroids asteroids_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.asteroids
    ADD CONSTRAINT asteroids_name_key UNIQUE (name);


--
-- Name: asteroids asteroids_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.asteroids
    ADD CONSTRAINT asteroids_pkey PRIMARY KEY (asteroids_id);


--
-- Name: galaxy galaxy_galaxy_id_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_galaxy_id_key UNIQUE (galaxy_id);


--
-- Name: galaxy galaxy_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_pkey PRIMARY KEY (galaxy_id);


--
-- Name: moon moon_moon_id_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_moon_id_key UNIQUE (moon_id);


--
-- Name: moon moon_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_pkey PRIMARY KEY (moon_id);


--
-- Name: planet planet_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_pkey PRIMARY KEY (planet_id);


--
-- Name: planet planet_planet_id_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_planet_id_key UNIQUE (planet_id);


--
-- Name: star star_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_pkey PRIMARY KEY (star_id);


--
-- Name: star star_star_id_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_star_id_key UNIQUE (star_id);


--
-- Name: star star_galaxy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_galaxy_id_fkey FOREIGN KEY (galaxy_id) REFERENCES public.galaxy(galaxy_id);


--
-- Name: star star_galaxy_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_galaxy_id_fkey1 FOREIGN KEY (galaxy_id) REFERENCES public.galaxy(galaxy_id);


--
-- Name: star star_galaxy_id_fkey2; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_galaxy_id_fkey2 FOREIGN KEY (galaxy_id) REFERENCES public.galaxy(galaxy_id);


--
-- PostgreSQL database dump complete
--

