--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

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
-- Data for Name: Region; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Region" (id, name, district, "createdAt", "updatedAt") VALUES ('cms2vox5p0001uolgtyrbp50z', 'dlkj', 'Tanjung Priok', '2026-07-27 07:01:18.685', '2026-07-27 07:01:18.685');
INSERT INTO public."Region" (id, name, district, "createdAt", "updatedAt") VALUES ('cms2wneb40000uotwpz1p9ntw', 'ikuy', 'Tanjung Priok', '2026-07-27 07:28:07.217', '2026-07-27 07:28:07.217');
INSERT INTO public."Region" (id, name, district, "createdAt", "updatedAt") VALUES ('cms8bfqfc0004uof4qavkgi5x', 'Bahari', 'Tanjung Priok', '2026-07-31 02:20:54.792', '2026-07-31 02:20:54.792');
INSERT INTO public."Region" (id, name, district, "createdAt", "updatedAt") VALUES ('cmse0b3gf0002uo5806uxy9sz', 'Warakas', 'Tanjung Priok', '2026-08-04 01:55:59.672', '2026-08-04 01:55:59.672');
INSERT INTO public."Region" (id, name, district, "createdAt", "updatedAt") VALUES ('cmse0bg7u0003uo58riqh0jc1', 'Papanggo', 'Tanjung Priok', '2026-08-04 01:56:16.219', '2026-08-04 01:56:16.219');
INSERT INTO public."Region" (id, name, district, "createdAt", "updatedAt") VALUES ('cmse0bwpd0004uo58zrc6ihbb', 'Koja', 'Tanjung Priok', '2026-08-04 01:56:37.585', '2026-08-04 01:56:37.585');
INSERT INTO public."Region" (id, name, district, "createdAt", "updatedAt") VALUES ('cmse0cb5r0005uo58k2rhhhkx', 'Sunter', 'Tanjung Priok', '2026-08-04 01:56:56.319', '2026-08-04 01:56:56.319');


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."User" (id, name, email, password, role, "regionId", "totalPoint", "createdAt", "updatedAt", "emailVerified", image, "lastLoginAt", "rememberMe") VALUES ('cms2snw3q0002uojwgbt5bi5j', 'dimas', 'dimassyahreza08@gmail.com', '$2b$10$jyZPNhS6W8IGfv6JejyqA.5IqncA.jSwwmjh7Hptqfkkd/fy3vrmG', 'WARGA', 'cms2vox5p0001uolgtyrbp50z', 0, '2026-07-27 05:36:31.814', '2026-07-31 02:15:21.593', NULL, NULL, '2026-07-27 05:46:34.797', false);
INSERT INTO public."User" (id, name, email, password, role, "regionId", "totalPoint", "createdAt", "updatedAt", "emailVerified", image, "lastLoginAt", "rememberMe") VALUES ('cms1is2io0000uo78hcnvqdgz', 'Administrator', 'admin@simpah.id', '$2b$12$OWL9e3oU3N4X4v3Gb7zs/uvHWsCz3kPRtjDUv04FrMzotoZAyLfjq', 'ADMIN', NULL, 0, '2026-07-26 08:12:04.417', '2026-09-08 02:26:11.02', NULL, NULL, '2026-09-08 02:26:11.012', false);
INSERT INTO public."User" (id, name, email, password, role, "regionId", "totalPoint", "createdAt", "updatedAt", "emailVerified", image, "lastLoginAt", "rememberMe") VALUES ('cmse0dmx10007uo58fkgfkhoc', 'Sunter', 'sunter@simpah.id', '$2b$10$JBhC9fBPOL./bBR6FNsdd.9Q7wJQjXpj2O5KzDaeip3eRNM0vXuIm', 'PETUGAS', 'cmse0cb5r0005uo58k2rhhhkx', 0, '2026-08-04 01:57:58.154', '2026-09-29 02:35:31.662', NULL, NULL, '2026-09-29 02:35:31.602', false);
INSERT INTO public."User" (id, name, email, password, role, "regionId", "totalPoint", "createdAt", "updatedAt", "emailVerified", image, "lastLoginAt", "rememberMe") VALUES ('cmtdzrs4f0003uo3c2ud6n7u9', 'Dimas Syahreza', 'da@gmail.com', '$2b$10$e6ipodw8s8vtR9eSJe91Su/hEGGMLoW7QhseEDwhZ2nfv2eYb8cAu', 'WARGA', 'cmse0cb5r0005uo58k2rhhhkx', 3132000, '2026-08-29 06:20:40.848', '2026-09-29 02:36:26.147', NULL, NULL, '2026-09-08 02:24:56.719', false);
INSERT INTO public."User" (id, name, email, password, role, "regionId", "totalPoint", "createdAt", "updatedAt", "emailVerified", image, "lastLoginAt", "rememberMe") VALUES ('cmscpvzai0002uoqwwximhgjq', 'Dimas Syahreza', 'admin@garuda.co.id', '$2b$12$7Jw68L920DjAzIoqJVCjZ.DssaFYYBQAfqf2PuD6i027hrBSg.6rG', 'WARGA', NULL, 0, '2026-08-03 04:16:32.107', '2026-08-03 04:16:32.107', NULL, NULL, NULL, false);
INSERT INTO public."User" (id, name, email, password, role, "regionId", "totalPoint", "createdAt", "updatedAt", "emailVerified", image, "lastLoginAt", "rememberMe") VALUES ('cms8b7lgo0003uof4os9y6x58', 'deamz syazh', 'd@gmail.com', '$2b$10$yvoTNaZ3SQl2183ebhQOP.4NrUlD8XnjtMYgVSfI5KiXtQNzsuGYW', 'WARGA', 'cms2vox5p0001uolgtyrbp50z', 21090888, '2026-07-31 02:14:35.112', '2026-08-03 04:20:51.917', NULL, NULL, '2026-08-03 04:16:42.627', false);
INSERT INTO public."User" (id, name, email, password, role, "regionId", "totalPoint", "createdAt", "updatedAt", "emailVerified", image, "lastLoginAt", "rememberMe") VALUES ('cms8bgh2m0006uof4g85po5kd', 'Dimas Syahreza', 'admin@example.com', '$2b$10$XN38Wln2Bj8MjqHZj4VJGOmYRgnOojDE4X2ZI0ayWeGjpUkjZ3jLe', 'PETUGAS', 'cms2vox5p0001uolgtyrbp50z', 0, '2026-07-31 02:21:29.326', '2026-08-03 04:50:08.966', NULL, NULL, '2026-08-03 04:19:42.566', false);
INSERT INTO public."User" (id, name, email, password, role, "regionId", "totalPoint", "createdAt", "updatedAt", "emailVerified", image, "lastLoginAt", "rememberMe") VALUES ('cmse0ej0z0009uo585zg1h0us', 'Warakas', 'warakas@simpah.id', '$2b$10$A52oNOi3zepwFknT3hHMO.FfNHT1Qp8NDfkBimVD9bJAnaFz.YGaG', 'PETUGAS', 'cmse0b3gf0002uo5806uxy9sz', 0, '2026-08-04 01:58:39.827', '2026-08-04 01:58:39.827', NULL, NULL, NULL, false);
INSERT INTO public."User" (id, name, email, password, role, "regionId", "totalPoint", "createdAt", "updatedAt", "emailVerified", image, "lastLoginAt", "rememberMe") VALUES ('cmse0uy2w000buo58r83amncf', 'deamz syazh', 'budi@simpah.id', '$2b$10$HnSGGGpRaPIDqrYvJ/vInOOI0Rifa8FB0QRjVIVmthdWE.daNXa4K', 'WARGA', 'cmse0cb5r0005uo58k2rhhhkx', 0, '2026-08-04 02:11:25.833', '2026-08-04 02:29:22.047', NULL, NULL, '2026-08-04 02:29:22.04', false);


--
-- Data for Name: Account; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: AuditLog; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."AuditLog" (id, action, description, "userId", "createdAt") VALUES ('cms2rfxc80001uojw8pg1hfgj', 'LOGIN', 'Administrator berhasil login', 'cms1is2io0000uo78hcnvqdgz', '2026-07-27 05:02:20.552');
INSERT INTO public."AuditLog" (id, action, description, "userId", "createdAt") VALUES ('cms2so6sm0004uojw1pn9u08m', 'LOGIN', 'dimas berhasil login', 'cms2snw3q0002uojwgbt5bi5j', '2026-07-27 05:36:45.67');
INSERT INTO public."AuditLog" (id, action, description, "userId", "createdAt") VALUES ('cms2t0thn0001uo681i5apmla', 'LOGIN', 'dimas berhasil login', 'cms2snw3q0002uojwgbt5bi5j', '2026-07-27 05:46:34.955');
INSERT INTO public."AuditLog" (id, action, description, "userId", "createdAt") VALUES ('cms2td2e90001uofs6ugs3811', 'LOGIN', 'Administrator berhasil login', 'cms1is2io0000uo78hcnvqdgz', '2026-07-27 05:56:06.369');
INSERT INTO public."AuditLog" (id, action, description, "userId", "createdAt") VALUES ('cms7065q80001uod0ex8o1p6f', 'LOGIN', 'Administrator berhasil login', 'cms1is2io0000uo78hcnvqdgz', '2026-07-30 04:17:46.091');
INSERT INTO public."AuditLog" (id, action, description, "userId", "createdAt") VALUES ('cms75y7s80001uo2cvo7h8rnz', 'LOGIN', 'Administrator berhasil login', 'cms1is2io0000uo78hcnvqdgz', '2026-07-30 06:59:33.171');
INSERT INTO public."AuditLog" (id, action, description, "userId", "createdAt") VALUES ('cms790p8h0001uoawm2a0o0j6', 'LOGIN', 'Administrator berhasil login', 'cms1is2io0000uo78hcnvqdgz', '2026-07-30 08:25:27.946');
INSERT INTO public."AuditLog" (id, action, description, "userId", "createdAt") VALUES ('cms79ia1v0001uopg1f4jzlwf', 'LOGIN', 'Administrator berhasil login', 'cms1is2io0000uo78hcnvqdgz', '2026-07-30 08:39:08.131');
INSERT INTO public."AuditLog" (id, action, description, "userId", "createdAt") VALUES ('cms8as37a0001uof41cfo0k6n', 'LOGIN', 'Administrator berhasil login', 'cms1is2io0000uo78hcnvqdgz', '2026-07-31 02:02:31.573');
INSERT INTO public."AuditLog" (id, action, description, "userId", "createdAt") VALUES ('cms8cews40008uof4ny53m879', 'LOGIN', 'deamz syazh berhasil login', 'cms8b7lgo0003uof4os9y6x58', '2026-07-31 02:48:15.988');
INSERT INTO public."AuditLog" (id, action, description, "userId", "createdAt") VALUES ('cms8d4t7q000auof4pwrec9ns', 'LOGIN', 'deamz syazh berhasil login', 'cms8b7lgo0003uof4os9y6x58', '2026-07-31 03:08:24.422');
INSERT INTO public."AuditLog" (id, action, description, "userId", "createdAt") VALUES ('cms8ea9ml000euof4khnn8ptj', 'LOGIN', 'Administrator berhasil login', 'cms1is2io0000uo78hcnvqdgz', '2026-07-31 03:40:38.589');
INSERT INTO public."AuditLog" (id, action, description, "userId", "createdAt") VALUES ('cms8eb49e000guof4y6dxfrsa', 'LOGIN', 'Dimas Syahreza berhasil login', 'cms8bgh2m0006uof4g85po5kd', '2026-07-31 03:41:18.241');
INSERT INTO public."AuditLog" (id, action, description, "userId", "createdAt") VALUES ('cmscpp54t0001uoqw4bocdlmi', 'LOGIN', 'Dimas Syahreza berhasil login', 'cms8bgh2m0006uof4g85po5kd', '2026-08-03 04:11:13.027');
INSERT INTO public."AuditLog" (id, action, description, "userId", "createdAt") VALUES ('cmscpw7g50004uoqwp39fs4wh', 'LOGIN', 'deamz syazh berhasil login', 'cms8b7lgo0003uof4os9y6x58', '2026-08-03 04:16:42.677');
INSERT INTO public."AuditLog" (id, action, description, "userId", "createdAt") VALUES ('cmscpxbit0006uoqwho2uuehm', 'LOGIN', 'Administrator berhasil login', 'cms1is2io0000uo78hcnvqdgz', '2026-08-03 04:17:34.614');
INSERT INTO public."AuditLog" (id, action, description, "userId", "createdAt") VALUES ('cmscq029e0008uoqw263o6maw', 'LOGIN', 'Dimas Syahreza berhasil login', 'cms8bgh2m0006uof4g85po5kd', '2026-08-03 04:19:42.579');
INSERT INTO public."AuditLog" (id, action, description, "userId", "createdAt") VALUES ('cmscq1jst000auoqw3vq4yi7p', 'SUBMISSION_VERIFIED', 'Setoran diverifikasi oleh Dimas Syahreza', 'cms8bgh2m0006uof4g85po5kd', '2026-08-03 04:20:51.965');
INSERT INTO public."AuditLog" (id, action, description, "userId", "createdAt") VALUES ('cmscr37io000cuoqwe0zvps9f', 'PASSWORD_CHANGE', 'Dimas Syahreza mengganti password', 'cms8bgh2m0006uof4g85po5kd', '2026-08-03 04:50:08.976');
INSERT INTO public."AuditLog" (id, action, description, "userId", "createdAt") VALUES ('cmscswhgf0001uo1s6l0vmzwy', 'LOGIN', 'Administrator berhasil login', 'cms1is2io0000uo78hcnvqdgz', '2026-08-03 05:40:54.443');
INSERT INTO public."AuditLog" (id, action, description, "userId", "createdAt") VALUES ('cmscvoar80001uouk57z475gh', 'LOGIN', 'Administrator berhasil login', 'cms1is2io0000uo78hcnvqdgz', '2026-08-03 06:58:31.369');
INSERT INTO public."AuditLog" (id, action, description, "userId", "createdAt") VALUES ('cmscvvt550003uoukq35re49c', 'LOGIN', 'Administrator berhasil login', 'cms1is2io0000uo78hcnvqdgz', '2026-08-03 07:04:21.833');
INSERT INTO public."AuditLog" (id, action, description, "userId", "createdAt") VALUES ('cmsdzb8ci0001uo58xrhyenv9', 'LOGIN', 'Administrator berhasil login', 'cms1is2io0000uo78hcnvqdgz', '2026-08-04 01:28:06.293');
INSERT INTO public."AuditLog" (id, action, description, "userId", "createdAt") VALUES ('cmse13hab000duo58r1yyen50', 'LOGIN', 'deamz syazh berhasil login', 'cmse0uy2w000buo58r83amncf', '2026-08-04 02:18:03.948');
INSERT INTO public."AuditLog" (id, action, description, "userId", "createdAt") VALUES ('cmse1i0i0000fuo585js9t0sg', 'LOGIN', 'deamz syazh berhasil login', 'cmse0uy2w000buo58r83amncf', '2026-08-04 02:29:22.056');
INSERT INTO public."AuditLog" (id, action, description, "userId", "createdAt") VALUES ('cmse2iu8e000huo58977zc0d9', 'LOGIN', 'Administrator berhasil login', 'cms1is2io0000uo78hcnvqdgz', '2026-08-04 02:58:00.206');
INSERT INTO public."AuditLog" (id, action, description, "userId", "createdAt") VALUES ('cmse4bcxz000juo58r5ch7uym', 'LOGIN', 'Administrator berhasil login', 'cms1is2io0000uo78hcnvqdgz', '2026-08-04 03:48:10.439');
INSERT INTO public."AuditLog" (id, action, description, "userId", "createdAt") VALUES ('cmsmvd4os0001uo6w20ggv5ea', 'LOGIN', 'Administrator berhasil login', 'cms1is2io0000uo78hcnvqdgz', '2026-08-10 06:47:32.056');
INSERT INTO public."AuditLog" (id, action, description, "userId", "createdAt") VALUES ('cmtdzp63k0001uo3ceqtzle3m', 'LOGIN', 'Sunter berhasil login', 'cmse0dmx10007uo58fkgfkhoc', '2026-08-29 06:18:38.818');
INSERT INTO public."AuditLog" (id, action, description, "userId", "createdAt") VALUES ('cmtdzsfcg0005uo3c4c6clac3', 'LOGIN', 'Dimas Syahreza berhasil login', 'cmtdzrs4f0003uo3c2ud6n7u9', '2026-08-29 06:21:10.961');
INSERT INTO public."AuditLog" (id, action, description, "userId", "createdAt") VALUES ('cmte0dei50001uofkvhfxd8qf', 'LOGIN', 'Dimas Syahreza berhasil login', 'cmtdzrs4f0003uo3c2ud6n7u9', '2026-08-29 06:37:29.574');
INSERT INTO public."AuditLog" (id, action, description, "userId", "createdAt") VALUES ('cmts1r5cy0001uot03y7nn5iq', 'LOGIN', 'Dimas Syahreza berhasil login', 'cmtdzrs4f0003uo3c2ud6n7u9', '2026-09-08 02:24:56.927');
INSERT INTO public."AuditLog" (id, action, description, "userId", "createdAt") VALUES ('cmts1sqgb0003uot0se9huuja', 'LOGIN', 'Administrator berhasil login', 'cms1is2io0000uo78hcnvqdgz', '2026-09-08 02:26:11.051');
INSERT INTO public."AuditLog" (id, action, description, "userId", "createdAt") VALUES ('cmum2dn4k0001uosg9uut6vqf', 'LOGIN', 'Sunter berhasil login', 'cmse0dmx10007uo58fkgfkhoc', '2026-09-29 02:35:31.755');
INSERT INTO public."AuditLog" (id, action, description, "userId", "createdAt") VALUES ('cmum2et4h0003uosgk58vvqqr', 'SUBMISSION_VERIFIED', 'Setoran diverifikasi oleh Sunter', 'cmse0dmx10007uo58fkgfkhoc', '2026-09-29 02:36:26.226');


--
-- Data for Name: WasteCategory; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."WasteCategory" (id, name, point, "createdAt") VALUES ('cms7bhgte0001uok4esu875iw', 'botol plastik', 12000, '2026-07-30 09:34:29.433');
INSERT INTO public."WasteCategory" (id, name, point, "createdAt") VALUES ('cms7ccpo80002uok4vs87r67x', 'kaca', 121212, '2026-07-30 09:58:47.286');
INSERT INTO public."WasteCategory" (id, name, point, "createdAt") VALUES ('cms7bh44a0000uok405mfkmix', 'Plastik', 12000, '2026-07-30 09:34:12.962');


--
-- Data for Name: Submission; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Submission" (id, "userId", "regionId", "categoryId", weight, photo, point, status, "createdAt") VALUES ('cms8d5gdg000cuof41xjerk37', 'cms8b7lgo0003uof4os9y6x58', 'cms2vox5p0001uolgtyrbp50z', 'cms7ccpo80002uok4vs87r67x', 87, '/uploads/submissions/c6d7c877-0b98-4be8-91f0-9182678cd3bb-ChatGPT Image Jul 28, 2026, 07_43_16 PM.png', 10545444, 'VERIFIED', '2026-07-31 03:08:54.436');
INSERT INTO public."Submission" (id, "userId", "regionId", "categoryId", weight, photo, point, status, "createdAt") VALUES ('cmtdzth940007uo3coen3cb8x', 'cmtdzrs4f0003uo3c2ud6n7u9', 'cmse0cb5r0005uo58k2rhhhkx', 'cms7bhgte0001uok4esu875iw', 87, '/uploads/submissions/25dc4727-93a2-402f-8625-6241b613a124-image.png', 1044000, 'PENDING', '2026-08-29 06:22:00.089');
INSERT INTO public."Submission" (id, "userId", "regionId", "categoryId", weight, photo, point, status, "createdAt") VALUES ('cmtdztjw00009uo3cbvfl2f6i', 'cmtdzrs4f0003uo3c2ud6n7u9', 'cmse0cb5r0005uo58k2rhhhkx', 'cms7bhgte0001uok4esu875iw', 87, '/uploads/submissions/5452d1ed-2b15-427a-a90e-15a09a351ee9-image.png', 1044000, 'VERIFIED', '2026-08-29 06:22:03.504');


--
-- Data for Name: FotoSampah; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Notification; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Profile; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Reward; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Session; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: UserReward; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: VerificationToken; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('8d23a760-f67d-4813-a61b-c809d1bca236', '2b1cf62570dd97979acac6da7190cc7a66bf748905c8eddfb6d6ba0124f38a25', '2026-07-26 14:56:46.371172+07', '20260726075646_init', NULL, NULL, '2026-07-26 14:56:46.198723+07', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('c12c8348-a25c-4785-9f59-4d5a2e29cd6f', '1b7e3d5489719bbcf050e0eb25f0d3fc46144d063ee9d29d9afef2ad4f0018c9', '2026-07-26 20:25:32.70238+07', '20260726132532_add_auth', NULL, NULL, '2026-07-26 20:25:32.633701+07', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('f153a0d2-4404-4167-a35a-580134ea60d0', '004421c1bddc5dc5dae03cd9c232ee71015b4221188645cd7e829f2cec098ac2', '2026-07-26 22:48:21.152741+07', '20260726154821_update_user_model', NULL, NULL, '2026-07-26 22:48:21.114756+07', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('b6cef1c9-e5a8-4e56-b00b-e3af6550bd18', 'e7012e0cac03170f134b1382bd91b7cf8afb8c90d13e8c9166245cbede10f137', '2026-08-29 12:05:00.450242+07', '20260829050459_add_one_to_one_and_many_to_many', NULL, NULL, '2026-08-29 12:04:59.545507+07', 1);


--
-- PostgreSQL database dump complete
--

