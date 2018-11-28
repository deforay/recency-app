-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 28, 2018 at 04:39 PM
-- Server version: 5.7.24-0ubuntu0.16.04.1
-- PHP Version: 7.0.32-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `recency_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `city_details`
--

CREATE TABLE `city_details` (
  `city_id` int(11) NOT NULL,
  `district_id` int(11) NOT NULL,
  `city_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `district_details`
--

CREATE TABLE `district_details` (
  `district_id` int(11) NOT NULL,
  `province_id` int(11) NOT NULL,
  `district_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `district_details`
--

INSERT INTO `district_details` (`district_id`, `province_id`, `district_name`) VALUES
(1, 1, 'Bugesera'),
(2, 1, 'Burera'),
(3, 1, 'Gakenke'),
(4, 1, 'Gasabo'),
(5, 1, 'Gatsibo'),
(6, 2, 'Gicumbi'),
(7, 2, 'Gisagara'),
(8, 2, 'Huye'),
(9, 2, 'Kamonyi'),
(10, 3, 'Karongi'),
(11, 3, 'Kayonza'),
(12, 3, 'Kicukiro'),
(13, 3, 'Kirehe');

-- --------------------------------------------------------

--
-- Table structure for table `facilities`
--

CREATE TABLE `facilities` (
  `facility_id` int(11) NOT NULL,
  `facility_name` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `district` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `latitude` varchar(255) DEFAULT NULL,
  `longitude` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `alt_email` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `facilities`
--

INSERT INTO `facilities` (`facility_id`, `facility_name`, `province`, `district`, `city`, `latitude`, `longitude`, `email`, `alt_email`, `status`) VALUES
(1, 'Test 2 user', '1', '1', '', '230', '450', 'park@recency.com', 'info@recency.com', 'active'),
(2, 'Ndongozi Health Center', '1', '1', '', '', '', 'transport@recency.com', 'info@recency.com', 'inactive'),
(3, 'Gashora Health Centers', '1', '1', '', '', '', 'accommodation@recency.com', 'info@recency.com', 'inactive'),
(4, 'Test 1 kumar', '2', '6', '', '256', '265', 'lab@recency.com', 'info@recency.com', 'active'),
(5, 'Kinoni Health Center', '2', '6', '', '', '', 'kinonitest@gmail.com', '', 'inactive'),
(6, 'Facility test', '2', '7', '', NULL, NULL, NULL, NULL, NULL),
(7, 'Bed Faclties', '1', '2', '', NULL, NULL, NULL, NULL, 'active'),
(8, '', '', '', '', NULL, NULL, NULL, NULL, 'active'),
(9, '1`212', '5', '', '', NULL, NULL, NULL, NULL, 'active');

-- --------------------------------------------------------

--
-- Table structure for table `global_config`
--

CREATE TABLE `global_config` (
  `config_id` int(11) NOT NULL,
  `display_name` varchar(255) DEFAULT NULL,
  `global_name` varchar(255) DEFAULT NULL,
  `global_value` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `global_config`
--

INSERT INTO `global_config` (`config_id`, `display_name`, `global_name`, `global_value`) VALUES
(1, 'Location One', 'location_one', 'Province'),
(2, 'Location Two', 'location_two', 'District'),
(3, 'Location Three', 'location_three', 'City'),
(4, 'Recency Mandatory Fields', 'mandatory_fields', 'Age,Control Line,Current Sexual Partner,Dob,Education Level,Facility Name,Gender,Hiv Diagnosis Date,Hiv Recency Date,Kit Expiry Date,Last HIV Status,Latitude,Long Term Verification Line,Longitude,Marital Status,Past Hiv Testing,Patient Id,Patient on ART,Positive Verification Line,Pregnancy Status,Residence,Risk Population,Sample Id,Test Kit Lot No,Test Kit Name,Test Last 12 Month,Tester Name'),
(5, 'Admin Email', 'admin_email', 'admin@gmail.com'),
(6, 'Admin Phone', 'admin_phone', '111111111');

-- --------------------------------------------------------

--
-- Table structure for table `province_details`
--

CREATE TABLE `province_details` (
  `province_id` int(11) NOT NULL,
  `province_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `province_details`
--

INSERT INTO `province_details` (`province_id`, `province_name`) VALUES
(1, 'Eastern'),
(2, 'Northern'),
(3, 'Western'),
(4, 'Southern'),
(5, 'Central');

-- --------------------------------------------------------

--
-- Table structure for table `quality_check_test`
--

CREATE TABLE `quality_check_test` (
  `qc_test_id` int(11) NOT NULL,
  `qc_test_date` date DEFAULT NULL,
  `qc_sample_id` varchar(255) DEFAULT NULL,
  `reference_result` varchar(255) DEFAULT NULL,
  `kit_name` varchar(40) DEFAULT NULL,
  `kit_lot_no` varchar(255) DEFAULT NULL,
  `kit_expiry_date` date DEFAULT NULL,
  `recency_test_performed` varchar(255) DEFAULT NULL,
  `recency_test_not_performed_reason` varchar(255) DEFAULT NULL,
  `other_recency_test_not_performed_reason` varchar(255) DEFAULT NULL,
  `hiv_recency_date` date DEFAULT NULL,
  `control_line` varchar(255) DEFAULT NULL,
  `positive_verification_line` varchar(255) DEFAULT NULL,
  `long_term_verification_line` varchar(255) DEFAULT NULL,
  `term_outcome` varchar(255) DEFAULT NULL,
  `tester_name` varchar(255) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `app_version` varchar(255) DEFAULT NULL,
  `form_initiation_datetime` datetime DEFAULT NULL,
  `form_transfer_datetime` datetime DEFAULT NULL,
  `sync_by` int(11) DEFAULT NULL,
  `added_on` datetime DEFAULT NULL,
  `added_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `quality_check_test`
--

INSERT INTO `quality_check_test` (`qc_test_id`, `qc_test_date`, `qc_sample_id`, `reference_result`, `kit_name`, `kit_lot_no`, `kit_expiry_date`, `recency_test_performed`, `recency_test_not_performed_reason`, `other_recency_test_not_performed_reason`, `hiv_recency_date`, `control_line`, `positive_verification_line`, `long_term_verification_line`, `term_outcome`, `tester_name`, `comment`, `app_version`, `form_initiation_datetime`, `form_transfer_datetime`, `sync_by`, `added_on`, `added_by`) VALUES
(1, '2018-10-18', '123', 'preliminary_recent_sample', NULL, '123', '2018-10-20', NULL, '', '', '2018-10-26', 'absent', 'present', 'present', 'Invalid – Please Verify', 'Ravi', 'No comments', NULL, NULL, NULL, NULL, '2018-10-30 18:18:41', 1),
(2, '2018-10-26', 'sample test', 'hiv_negative_sample', NULL, '666', '2018-10-20', 'true', 'other', 'Part one', '2018-11-15', 'absent', 'present', 'absent', 'Invalid – Please Verify', 'Shayam', 'no commentsfrewf', NULL, NULL, NULL, NULL, '2018-10-30 18:41:03', 1),
(3, '2018-11-07', '23', 'long_term_sample', NULL, '2323', '2018-11-10', NULL, NULL, NULL, '2018-11-15', 'present', 'absent', 'present', 'Invalid – Please Verify', '', '', NULL, NULL, NULL, NULL, '2018-11-01 18:25:50', 1),
(4, '2018-11-01', 'Test ing vivek', 'preliminary_recent_sample', NULL, '880786910', '2018-11-15', NULL, NULL, NULL, '2018-12-02', 'absent', 'present', 'absent', 'Invalid – Please Verify', 'RAVIIIIIIIII', 'no comments simply waste', NULL, NULL, NULL, NULL, '2018-11-01 18:29:49', 1),
(5, '2018-11-07', '1111111111', 'long_term_sample', NULL, '11111111111', '2018-11-08', NULL, NULL, NULL, '2018-11-24', 'absent', 'present', 'present', 'Invalid – Please Verify', '111111111111', '11111111111111', NULL, NULL, NULL, NULL, '2018-11-01 18:53:25', 1),
(6, '2018-11-05', 'HI', 'preliminary_recent_sample', NULL, '12321', NULL, NULL, NULL, NULL, '2018-11-01', 'absent', 'present', 'absent', 'Invalid – Please Verify', 'vivek', '', NULL, NULL, NULL, NULL, '2018-11-08 13:00:07', 1),
(7, '2018-11-07', '123', 'long_term_sample', NULL, '', '2018-10-30', NULL, NULL, NULL, '2018-11-13', 'present', 'present', 'absent', 'Assay Recent', '', '', NULL, NULL, NULL, NULL, '2018-11-08 13:01:34', 1),
(8, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2018-11-08 13:02:03', NULL),
(9, NULL, 't', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2018-11-08 13:09:01', NULL),
(10, NULL, 'testtttt', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2018-11-08 13:15:36', NULL),
(11, '2018-11-08', 'testtttt', 'positve', NULL, '54545', '2018-11-08', NULL, NULL, NULL, '2018-11-08', 'dferf', 'vgrgf', 'gfwr', NULL, 'vivek', NULL, NULL, NULL, NULL, NULL, '2018-11-08 13:19:28', NULL),
(12, '2018-11-15', 'Exercitation aperiam soluta ratione incidunt voluptas illo omnis duis possimus enim illo nostrum obcaecati ut sed', 'hiv_negative_sample', NULL, 'Sit est neque minus at commodi in velit reprehenderit aliquid odio necessitatibus et anim occaecat', '2018-11-08', NULL, NULL, NULL, '2018-11-17', 'present', 'present', 'absent', '', 'Brianna Brady', 'Ad rerum at dignissimos incidunt ipsum anim minus aute', NULL, NULL, NULL, NULL, '2018-11-08 13:22:12', 1),
(13, '2018-11-14', 'Dolor perferendis ea quaerat et aut quo suscipit', 'long_term_sample', NULL, 'Laboriosam hic qui ducimus incidunt consequuntur optio nostrud ullam doloremque voluptas omnis deserunt officia beatae', '2018-10-30', NULL, NULL, NULL, '2018-11-23', 'present', 'present', 'present', 'Long Term', 'Amos Cannon', 'Ullam occaecat ut voluptatem Magna pariatur Sed labore quod elit dignissimos sint odit ratione suscipit aliquip', NULL, NULL, NULL, NULL, '2018-11-08 13:25:40', 1),
(14, '2018-11-08', 'rubber', 'hiv_negative_sample', NULL, 'Earum consequat Tempor quia doloremque dolorem ipsum praesentium et nostrud magni ea consequatur ratione', '2018-11-08', NULL, NULL, NULL, '2018-11-13', 'present', 'absent', 'absent', 'HIV Negative', 'Quinn Jimenez', 'Incididunt quis quo autem deserunt dolorem dolorum non quod mollitia', NULL, NULL, NULL, NULL, '2018-11-08 13:26:02', 1),
(15, '2018-11-08', 'testtttt', 'positve', NULL, '54545', '2018-11-08', NULL, NULL, NULL, '2018-11-08', 'dferf', 'vgrgf', 'gfwr', NULL, 'vivek', NULL, NULL, NULL, NULL, NULL, '2018-11-08 13:38:47', NULL),
(16, '2018-11-08', 'raber', 'positve', NULL, '54545', '2018-11-08', NULL, NULL, NULL, '2018-11-08', 'dferf', 'vgrgf', 'gfwr', NULL, 'vivek', NULL, NULL, NULL, NULL, NULL, '2018-11-08 13:39:05', NULL),
(17, '2018-11-08', 'raber', 'positve', NULL, '54545', '2018-11-08', NULL, NULL, NULL, '2018-11-08', 'dferf', 'vgrgf', 'gfwr', NULL, 'vivek', NULL, NULL, NULL, NULL, NULL, '2018-11-08 13:43:13', NULL),
(18, '2018-11-08', 'LOve', 'hiv_negative_sample', 'sedia_bioscience', '9999', '2018-11-08', NULL, NULL, NULL, '2018-11-15', 'present', 'absent', 'absent', 'HIV Negative', 'Garrison Mccray', 'Harye', NULL, NULL, NULL, NULL, '2018-11-08 17:53:20', 1);

-- --------------------------------------------------------

--
-- Table structure for table `recency`
--

CREATE TABLE `recency` (
  `recency_id` int(11) NOT NULL,
  `sample_id` varchar(255) DEFAULT NULL,
  `patient_id` varchar(255) DEFAULT NULL,
  `facility_id` int(11) NOT NULL,
  `hiv_diagnosis_date` date DEFAULT NULL,
  `hiv_recency_date` date DEFAULT NULL,
  `recency_test_performed` varchar(255) DEFAULT NULL,
  `recency_test_not_performed` varchar(255) DEFAULT NULL,
  `other_recency_test_not_performed` varchar(255) DEFAULT NULL,
  `control_line` varchar(255) DEFAULT NULL,
  `positive_verification_line` varchar(255) DEFAULT NULL,
  `long_term_verification_line` varchar(255) DEFAULT NULL,
  `term_outcome` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `age` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `latitude` varchar(255) DEFAULT NULL,
  `longitude` varchar(255) DEFAULT NULL,
  `marital_status` varchar(255) DEFAULT NULL,
  `residence` varchar(255) DEFAULT NULL,
  `education_level` varchar(255) DEFAULT NULL,
  `risk_population` varchar(255) DEFAULT NULL,
  `other_risk_population` varchar(255) DEFAULT NULL,
  `pregnancy_status` varchar(255) DEFAULT NULL,
  `current_sexual_partner` varchar(255) DEFAULT NULL,
  `past_hiv_testing` varchar(255) DEFAULT NULL,
  `last_hiv_status` varchar(255) DEFAULT NULL,
  `patient_on_art` varchar(255) DEFAULT NULL,
  `test_last_12_month` varchar(255) DEFAULT NULL,
  `exp_violence_last_12_month` varchar(255) DEFAULT NULL,
  `mac_no` varchar(255) DEFAULT NULL,
  `cell_phone_number` varchar(255) DEFAULT NULL,
  `ip_address` varchar(255) DEFAULT NULL,
  `form_initiation_datetime` datetime DEFAULT NULL,
  `form_transfer_datetime` datetime DEFAULT NULL,
  `comment` text,
  `kit_lot_no` varchar(255) DEFAULT NULL,
  `kit_expiry_date` date DEFAULT NULL,
  `vl_result` varchar(255) DEFAULT NULL,
  `vl_test_date` date DEFAULT NULL,
  `final_outcome` varchar(255) DEFAULT NULL,
  `tester_name` varchar(255) DEFAULT NULL,
  `location_one` varchar(255) DEFAULT NULL,
  `location_two` varchar(255) DEFAULT NULL,
  `location_three` varchar(255) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `app_version` varchar(255) DEFAULT NULL,
  `added_on` datetime DEFAULT NULL,
  `added_by` int(11) DEFAULT NULL,
  `sync_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `recency`
--

INSERT INTO `recency` (`recency_id`, `sample_id`, `patient_id`, `facility_id`, `hiv_diagnosis_date`, `hiv_recency_date`, `recency_test_performed`, `recency_test_not_performed`, `other_recency_test_not_performed`, `control_line`, `positive_verification_line`, `long_term_verification_line`, `term_outcome`, `dob`, `age`, `gender`, `latitude`, `longitude`, `marital_status`, `residence`, `education_level`, `risk_population`, `other_risk_population`, `pregnancy_status`, `current_sexual_partner`, `past_hiv_testing`, `last_hiv_status`, `patient_on_art`, `test_last_12_month`, `exp_violence_last_12_month`, `mac_no`, `cell_phone_number`, `ip_address`, `form_initiation_datetime`, `form_transfer_datetime`, `comment`, `kit_lot_no`, `kit_expiry_date`, `vl_result`, `vl_test_date`, `final_outcome`, `tester_name`, `location_one`, `location_two`, `location_three`, `notes`, `app_version`, `added_on`, `added_by`, `sync_by`) VALUES
(1, '8288858', '85299', 1, '2018-10-16', '2018-10-16', NULL, NULL, NULL, 'absent', 'absent', 'absent', 'Invalid-Please Verify', '2018-10-16', '0', 'not_reported', '13.073', '80.219', 'widow', 'rural', 'university_or_higher', '5', NULL, 'not_known', '>3', 'no', '', NULL, 'not_known', 'not_known', '24878f249a305ffe', '918610828016', NULL, '2018-10-16 20:25:54', '2018-10-16 20:29:45', NULL, NULL, NULL, NULL, NULL, 'RITA Recent', NULL, '3', '12', '', 'Recency test changed', NULL, '2018-10-16 20:29:45', 1, NULL),
(2, '935882', '8635506', 8, '2018-10-16', '2018-10-16', NULL, NULL, NULL, 'absent', 'present', 'present', 'Invalid-Please Verify', '2018-10-16', '0', 'female', '13.073', '80.219', 'married_cohabiting', 'urban', 'primary', '4', NULL, 'not_known', '>3', 'not_known', '', '', 'no', 'no', '24878f249a305ffe', '918610828016', NULL, '2018-10-16 20:26:54', '2018-10-16 20:29:45', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '3', '13', '', '', NULL, '2018-10-16 20:29:45', 1, NULL),
(3, '100001', '#100001', 1, '2018-10-12', '2018-11-03', NULL, NULL, NULL, 'absent', 'present', 'absent', 'Invalid – Please Verify', '1866-08-25', '152', 'male', NULL, NULL, 'married_cohabiting', 'urban', 'secondary', '4', NULL, 'not_pregnant', '2_3', 'yes', 'positive', 'no', 'no', '', NULL, NULL, NULL, '2018-10-16 20:39:00', '2018-10-16 20:39:00', NULL, NULL, NULL, NULL, '2018-10-31', NULL, NULL, '1', '1', '', 'No comments', NULL, '2018-10-16 20:39:00', 1, NULL),
(4, '100002', '#100002', 7, '2018-11-06', NULL, 'true', 'no_sample_collected', '', NULL, NULL, NULL, '', '1986-10-22', '32', 'female', NULL, NULL, 'widow', 'rural', 'university_or_higher', '3', NULL, 'not_known', '2_3', 'no', '', NULL, 'no', 'no', NULL, NULL, NULL, '2018-10-16 20:43:13', '2018-10-16 20:43:13', NULL, NULL, NULL, NULL, NULL, 'RITA Recent', NULL, '1', '2', '', 'No comments', NULL, '2018-10-16 20:43:13', 1, NULL),
(5, '100003', '#100003', 8, '2018-11-20', '2018-11-02', NULL, NULL, NULL, 'absent', 'present', 'absent', 'Invalid – Please Verify', '2000-02-09', '19', 'male', NULL, NULL, 'married_cohabiting', 'urban', 'secondary', '8', NULL, 'currently_pregnant', '2_3', 'yes', 'negative', NULL, 'yes', 'no', NULL, NULL, NULL, '2018-10-16 20:45:25', '2018-10-16 20:45:25', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '3', '10', '', 'No', NULL, '2018-10-16 20:45:25', 1, NULL),
(6, '100004', '#100004', 5, '2018-10-27', '2018-10-05', NULL, NULL, NULL, 'absent', 'absent', 'present', 'Invalid – Please Verify', '2111-03-11', '92', 'female', NULL, NULL, 'married_cohabited', 'rural', 'university_or_higher', '12', NULL, 'not_pregnant', '2_3', 'yes', 'positive', 'yes', 'yes', 'no', NULL, NULL, NULL, '2018-10-16 20:49:21', '2018-10-16 20:49:21', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2', '6', '', 'No record  maintained', NULL, '2018-10-16 20:49:21', 1, NULL),
(7, '96235', '964123', 10, '2018-09-18', '2018-10-17', '0', NULL, NULL, 'present', 'present', 'present', 'Long Term', '1952-04-30', '66', 'male', '13.073307', '80.2192837', 'married_cohabiting', 'urban', 'secondary', '14', NULL, 'not_known', '>3', 'no', '', '', 'no', 'no', '24878f249a305ffe', NULL, NULL, '2018-10-17 15:52:30', '2018-10-17 15:56:22', NULL, NULL, NULL, NULL, NULL, 'RITA Recent', NULL, '3', '12', '', '', NULL, '2018-10-17 15:56:22', 1, NULL),
(8, '13328', '963888', 8, '2018-10-17', NULL, '1', NULL, NULL, '', '', '', '', '1947-10-12', '71', 'male', '13.073', '80.219', 'widow', 'rural', 'university_or_higher', '6', NULL, '', '>3', 'yes', 'negative', '', 'not_known', 'not_known', '24878f249a305ffe', '918610828016', NULL, '2018-10-17 17:05:32', '2018-10-17 17:08:49', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1', '3', '', '', NULL, '2018-10-17 17:08:49', 1, NULL),
(9, '0895513', 'ML855422', 8, '2018-07-02', NULL, '1', NULL, NULL, '', '', '', '', '1949-10-13', '69', 'female', '13.073307', '80.2192837', 'married_cohabited', 'urban', 'secondary', '4', NULL, 'not_pregnant', '2_3', 'yes', 'negative', '', 'no', 'no', '24878f249a305ffe', NULL, NULL, '2018-10-17 17:47:11', '2018-10-17 17:51:29', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2', '7', '', '', NULL, '2018-10-17 17:51:29', 1, NULL),
(10, 'RW1234567', 'Not Avaliable', 1, '2018-10-16', '2018-10-16', NULL, NULL, NULL, 'present', 'present', 'absent', 'Preliminary Recent', '1992-10-13', '26', 'male', '34.121', '-84.130', 'married_cohabiting', 'urban', 'secondary', '3', NULL, 'not_pregnant', '2_3', 'yes', 'negative', '', 'no', 'no', '11062727e5db6fe8', '+917291039576', NULL, '2018-10-16 23:33:38', '2018-10-17 19:34:51', NULL, NULL, NULL, NULL, '2018-11-02', 'RITA Recent', NULL, '1', '1', '', 'Testing', NULL, '2018-10-17 19:34:51', 1, NULL),
(11, 'Ghh555', 'Rtr', 7, '2018-10-08', '2018-10-16', NULL, NULL, NULL, 'present', 'present', 'absent', 'Preliminary Recent', '1998-10-08', '20', 'male', '', '', 'married_cohabited', 'urban', 'primary', '4', NULL, 'not_known', '2_3', 'yes', 'positive', 'yes', 'yes', 'yes', '11062727e5db6fe8', '+917291039576', NULL, '2018-10-17 19:34:25', '2018-10-17 19:34:51', NULL, NULL, NULL, NULL, '2018-11-10', 'RITA Recent', NULL, '2', '7', '', '', NULL, '2018-10-17 19:34:51', 1, NULL),
(12, '133', 'Rfg', 7, '2018-10-18', '2018-10-18', NULL, NULL, NULL, 'present', 'present', 'absent', 'Preliminary Recent', '2018-10-16', '0', 'male', '34.121', '-84.130', 'married_cohabiting', 'rural', 'primary', '4', NULL, '', '2_3', 'yes', 'negative', '', 'no', 'no', '11062727e5db6fe8', '+917291039576', NULL, '2018-10-18 17:01:33', '2018-10-18 20:58:13', NULL, NULL, NULL, NULL, NULL, 'RITA Recent', NULL, '2', '6', '', 'Dhjejje', NULL, '2018-10-18 20:58:13', 1, NULL),
(13, '12335544', '744255', 9, '2018-10-29', NULL, '1', NULL, NULL, '', '', '', '', '1969-06-19', '49', 'female', '13.073', '80.220', 'married_cohabiting', 'rural', 'primary', '4', NULL, 'not_pregnant', '2_3', 'no', '', '', '', 'no', '24878f249a305ffe', '918610828016', NULL, '2018-10-29 16:00:23', '2018-10-29 16:03:27', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2', '7', '', '', NULL, '2018-10-29 16:03:27', 1, NULL),
(14, '13380', '96580', 9, '2018-10-29', '2018-10-29', '1', NULL, NULL, 'present', 'present', 'present', 'Long Term', '1990-10-10', '28', 'male', '13.0733998', '80.2194757', 'married_cohabiting', 'urban', 'secondary', '5', NULL, '', '1', 'yes', 'positive', 'no', 'yes', 'yes', '24878f249a305ffe', '918610828016', NULL, '2018-10-29 16:01:45', '2018-10-29 16:05:14', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '3', '11', '', '', NULL, '2018-10-29 16:05:14', 1, NULL),
(15, '3225', '96588', 7, '2018-10-08', NULL, '1', NULL, NULL, '', '', '', '', '1976-10-11', '42', 'female', '13.0733998', '80.2194757', 'married_cohabiting', 'urban', 'university_or_higher', '3', NULL, 'not_pregnant', '2_3', 'no', '', '', '', 'yes', '24878f249a305ffe', '918610828016', NULL, '2018-10-29 16:08:00', '2018-10-29 17:08:33', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '3', '12', '', '', NULL, '2018-10-29 17:08:33', 1, NULL),
(16, '96688', '3358', 10, '2018-02-21', '2018-11-01', '0', NULL, NULL, 'present', 'absent', 'absent', 'HIV Negative', '2018-04-18', '0', 'not_reported', '13.073', '80.219', 'widow', 'urban', 'secondary', '3', NULL, 'currently_pregnant', '1', 'yes', 'positive', 'no', 'no', 'yes', '24878f249a305ffe', '918610828016', NULL, '2018-11-01 19:56:21', '2018-11-01 19:59:21', NULL, '6358LL5688', '2018-11-01', NULL, NULL, NULL, 'Xavier Will', '2', '8', '', '', NULL, '2018-11-01 19:59:21', 1, NULL),
(17, 'RW-12345', 'PW-12345', 1, '2018-11-13', '2018-11-05', NULL, NULL, NULL, 'present', 'present', 'present', 'Long Term', '2010-11-02', '8', 'male', '34.121', '-84.130', 'married_cohabited', 'urban', 'secondary', '15', NULL, '', '1', 'yes', 'positive', 'no', 'yes', 'no', '11062727e5db6fe8', '+917291039576', NULL, '2018-11-05 00:56:19', '2018-11-05 03:56:19', NULL, '012 BC 1234', '2018-12-31', NULL, '2018-11-21', NULL, 'Trudy Dobbs', '2', '7', '', 'Na', NULL, '2018-11-05 03:56:19', 1, NULL),
(18, '985658', '42288', 8, '2018-11-05', NULL, '1', NULL, NULL, '', '', '', '', '1990-11-06', '27', 'female', '13.117', '80.244', 'married_cohabiting', 'urban', 'primary', '4', NULL, 'not_pregnant', '2_3', 'no', '', '', '', 'no', '24878f249a305ffe', '918610828016', NULL, '2018-11-05 11:20:29', '2018-11-05 11:25:24', NULL, '1233BK9557', '2018-11-19', NULL, NULL, NULL, 'Harvey', '1', '2', '8', '', NULL, '2018-11-05 11:25:24', 1, NULL),
(19, 'Abc1234', 'Abc1234', 1, '2018-11-05', '2018-11-05', NULL, NULL, NULL, 'present', 'present', 'present', 'Long Term', '1980-11-05', '38', 'male', '33.799', '-84.327', 'married_cohabiting', 'urban', 'secondary', '11', NULL, '', '1', 'no', '', '', '', 'no', '11062727e5db6fe8', '+917291039576', NULL, '2018-11-05 18:47:25', '2018-11-05 21:17:56', NULL, 'Rjorvjt 357v 2d c t', '2020-01-08', NULL, '2018-11-22', NULL, 'Trudy Dobbs', '2', '7', '', '', NULL, '2018-11-05 21:17:56', 1, NULL),
(20, 'Eubvj', 'Dyhnkk', 1, '2018-11-05', '2018-11-05', NULL, NULL, NULL, 'present', 'present', 'absent', 'Preliminary Recent', '1988-11-08', '29', 'male', '33.799', '-84.327', 'married_cohabiting', 'urban', 'primary', '4', NULL, '', '2_3', 'no', '', '', '', 'yes', '11062727e5db6fe8', '+917291039576', NULL, '2018-11-05 20:42:34', '2018-11-08 01:05:27', NULL, 'Rjorvjt 357v 2d c t', '2020-01-08', NULL, '2018-11-16', 'RITA Recent', 'Ernest Yufenyuy', '2', '7', '', 'Test', NULL, '2018-11-08 01:05:27', 1, NULL),
(21, 'Fuu', 'Guii', 7, '2018-11-07', '2018-11-07', NULL, NULL, NULL, 'present', 'present', 'absent', 'Preliminary Recent', '1999-11-03', '19', 'male', '33.799', '-84.327', 'married_cohabiting', 'urban', 'secondary', '4', NULL, '', '2_3', 'yes', 'negative', 'yes', 'yes', 'no', '11062727e5db6fe8', '+917291039576', NULL, '2018-11-07 22:35:09', '2018-11-08 01:05:27', NULL, 'Rjorvjt 357v 2d c t', '2020-01-08', NULL, NULL, NULL, 'Ernest Yufenyuy', '2', '7', '', 'Fhj to t g utyy', NULL, '2018-11-08 01:05:27', 1, NULL),
(22, '95588', '1358', 8, '2018-11-02', '2018-11-05', '0', NULL, NULL, 'present', 'absent', 'absent', 'Assay HIV Negative', '1982-11-18', '35', 'female', '13.073', '80.219', 'married_cohabiting', 'rural', 'university_or_higher', '5', NULL, 'not_known', '>3', 'no', '', '', '', 'not_known', '24878f249a305ffe', '918610828016', NULL, '2018-11-09 19:26:10', '2018-11-09 19:29:26', NULL, 'SED - 1235', '2018-11-01', NULL, NULL, NULL, 'Harvey', '3', '12', '', '', NULL, '2018-11-09 19:29:26', 1, NULL),
(23, '93588', '13558', 11, '2018-11-04', '2018-11-04', NULL, NULL, NULL, 'present', 'absent', 'absent', 'Assay HIV Negative', '1989-06-18', '29', 'female', '13.073', '80.219', 'married_cohabiting', 'urban', 'primary', '4', NULL, 'not_pregnant', '2_3', 'yes', 'negative', '', 'no', 'no', '24878f249a305ffe', '918610828016', NULL, '2018-11-09 19:28:22', '2018-11-09 19:35:37', NULL, 'SED - 1235', '2018-11-01', NULL, NULL, NULL, 'Tony Hilder', '3', '12', '', '', NULL, '2018-11-09 19:35:37', 1, NULL),
(24, '62889', '55885', 8, '2018-11-04', NULL, '1', NULL, NULL, '', '', '', '', '1989-11-22', '28', 'female', '13.073', '80.219', 'married_cohabiting', 'urban', 'secondary', '3', NULL, 'currently_pregnant', '1', 'no', '', '', '', 'yes', '24878f249a305ffe', '918610828016', NULL, '2018-11-09 19:30:06', '2018-11-09 19:35:37', NULL, 'MAX - 6258', '2018-11-19', NULL, NULL, NULL, 'Tony Hilder', '2', '7', '', '', NULL, '2018-11-09 19:35:37', 1, NULL),
(25, '3288', '75588', 9, '2018-11-10', NULL, '1', NULL, NULL, '', '', '', '', '2018-11-04', '0', 'male', '13.073', '80.219', 'married_cohabiting', 'urban', 'primary', '4', NULL, '', '1', 'yes', 'positive', 'yes', 'yes', 'yes', '24878f249a305ffe', '918610828016', NULL, '2018-11-10 16:37:08', '2018-11-10 16:40:16', NULL, 'SED - 13988', '2018-11-05', NULL, NULL, NULL, 'Harvey', '2', '7', '', '', NULL, '2018-11-10 16:40:16', 1, NULL),
(26, '280395', '280395', 9, '2018-11-04', NULL, '1', NULL, NULL, '', '', '', '', '2018-11-04', '0', 'female', '13.073', '80.219', 'married_cohabiting', 'urban', 'secondary', '5', NULL, 'currently_pregnant', '1', 'no', '', '', '', 'yes', '24878f249a305ffe', '918610828016', NULL, '2018-11-10 16:47:03', '2018-11-10 16:50:21', NULL, 'SED - 13988', '2018-11-05', NULL, NULL, NULL, 'Mavis', '2', '7', '', '', '0.1', '2018-11-10 16:50:21', 1, NULL),
(27, '55789', '4588', 10, '2018-11-09', '2018-11-11', NULL, NULL, NULL, 'present', 'present', 'present', 'Long Term', '2018-11-03', '0', 'female', '13.118', '80.244', 'married_cohabiting', 'rural', 'secondary', '5', NULL, 'not_pregnant', '2_3', 'no', '', '', '', 'not_known', '24878f249a305ffe', '918610828016', NULL, '2018-11-11 13:41:46', '2018-11-11 13:44:52', NULL, 'SED - 13988', '2018-11-05', NULL, NULL, NULL, 'Mavis', '2', '7', '', '', '0.1', '2018-11-11 13:44:52', 1, NULL),
(28, '96578', '53488', 10, '2018-11-03', NULL, '1', NULL, NULL, '', '', '', '', '1985-11-28', '32', 'female', '13.118', '80.244', 'married_cohabiting', 'urban', 'primary', '4', NULL, 'currently_pregnant', '1', 'yes', 'positive', 'yes', 'no', 'no', '24878f249a305ffe', '918610828016', NULL, '2018-11-11 13:48:41', '2018-11-11 13:51:46', NULL, 'MAX - 3221', '2018-11-28', NULL, NULL, NULL, 'Tony', '2', '7', '', '', '0.1', '2018-11-11 13:51:46', 1, NULL),
(29, '423588', '2588', 9, '2018-11-08', NULL, '1', NULL, NULL, '', '', '', '', '2018-11-10', '0', 'male', '13.073', '80.219', 'married_cohabited', 'urban', 'university_or_higher', '4', NULL, '', '2_3', 'no', '', '', '', 'no', '24878f249a305ffe', '918610828016', NULL, '2018-11-13 18:49:03', '2018-11-13 18:52:15', NULL, '', NULL, NULL, NULL, NULL, '', '3', '11', '', '', '0.1', '2018-11-13 18:52:15', 1, NULL),
(30, '33280', '2358', 8, '2018-11-04', '2018-11-11', '0', NULL, NULL, 'present', 'absent', 'present', 'Invalid-Please Verify', '2018-11-09', '0', 'male', '13.073', '80.219', 'married_cohabiting', 'urban', 'primary', '4', NULL, '', '1', 'no', '', '', '', 'yes', '24878f249a305ffe', '918610828016', NULL, '2018-11-13 18:52:16', '2018-11-13 18:55:23', NULL, '', NULL, NULL, NULL, 'Invalid', '', '1', '2', '7', '', '0.1', '2018-11-13 18:55:23', 1, NULL),
(31, '63588', '4380', 9, '2018-11-09', '2018-11-09', NULL, NULL, NULL, 'present', 'absent', 'absent', 'Assay HIV Negative', '2013-11-14', '4', 'male', '13.073', '80.219', 'married_cohabited', 'urban', 'secondary', '4', NULL, '', '2_3', 'yes', 'negative', '', 'no', 'no', '24878f249a305ffe', '918610828016', NULL, '2018-11-13 18:53:47', '2018-11-13 18:56:55', NULL, '', NULL, NULL, NULL, 'Assay Negative', '', '2', '7', '', '', '0.1', '2018-11-13 18:56:55', 1, NULL),
(32, '53558', '', 9, '2018-11-10', NULL, '1', NULL, NULL, '', '', '', '', '2012-11-16', '5', 'female', '13.073', '80.219', 'married_cohabiting', 'urban', 'secondary', '3', NULL, 'currently_pregnant', '1', 'yes', 'positive', 'no', 'not_known', '', '24878f249a305ffe', '918610828016', NULL, '2018-11-14 11:45:09', '2018-11-14 12:02:46', NULL, 'SED - 6258', '2018-11-14', NULL, NULL, NULL, 'Rebecca', '1', '3', '', '', '0.1', '2018-11-14 12:02:46', 1, NULL),
(33, '3388', '9696', 9, '2018-11-11', NULL, '1', NULL, NULL, '', '', '', '', '2018-11-12', '0', 'female', '13.084', '80.225', 'married_cohabiting', 'urban', 'primary', '4', NULL, 'currently_pregnant', '1', 'yes', 'negative', '', 'no', 'no', '24878f249a305ffe', '918610828016', NULL, '2018-11-16 11:26:05', '2018-11-16 11:29:18', NULL, 'SED - 33599', '2018-11-25', NULL, NULL, NULL, 'Rizwanna', '2', '7', '', '', '0.1', '2018-11-16 11:29:18', 1, NULL),
(34, 'sam992', '', 1, '2018-11-16', '2018-11-16', '0', NULL, NULL, 'present', 'present', 'present', 'Long Term', '2007-03-17', '11', 'male', '32.986', '-96.701', 'never_married', 'urban', 'primary', '6', NULL, '', '2_3', 'yes', 'positive', 'yes', 'yes', 'not_known', '87bd3e68c1a4cd8e', NULL, NULL, '2018-11-16 07:47:32', '2018-11-16 19:17:54', NULL, 'MAX - MAX0073', '2018-11-21', NULL, NULL, 'Long Term', 'Test QC Name', '1', '1', '1', 'Test name', '0.1', '2018-11-16 19:17:54', 1, NULL),
(35, 'Mwtp1', '', 8, '2018-11-20', '2018-11-20', NULL, NULL, NULL, 'present', 'present', 'absent', 'Assay Recent', NULL, '', 'male', '33.798', '-84.327', 'married_cohabited', 'urban', 'secondary', '5', NULL, '', '2_3', 'no', '', '', '', 'no', '11062727e5db6fe8', '+917291039576', NULL, '2018-11-20 20:15:45', '2018-11-20 22:47:02', NULL, 'SED - Egkl', '2018-11-01', NULL, NULL, NULL, 'Smitabh', '1', '2', '7', '', '0.2', '2018-11-20 22:47:02', 1, NULL),
(36, 'Mwtp1', '', 8, '2018-11-20', '2018-11-20', NULL, NULL, NULL, 'present', 'present', 'absent', 'Assay Recent', NULL, '', 'male', '33.798', '-84.327', 'married_cohabited', 'urban', 'secondary', '5', NULL, '', '2_3', 'no', '', '', '', 'no', '11062727e5db6fe8', '+917291039576', NULL, '2018-11-20 20:15:45', '2018-11-20 22:47:02', NULL, 'SED - Egkl', '2018-11-01', NULL, NULL, NULL, 'Smitabh', '1', '2', '7', '', '0.2', '2018-11-20 22:47:02', 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `risk_populations`
--

CREATE TABLE `risk_populations` (
  `rp_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `risk_populations`
--

INSERT INTO `risk_populations` (`rp_id`, `name`) VALUES
(1, 'Heterosexual'),
(2, 'Men_who_have_sex_with_men'),
(3, 'Person_who_inject_drugs'),
(4, 'Female_sex_worker'),
(5, 'Transgender'),
(6, 'People_in_prison'),
(7, 'Other_close_setting'),
(8, 'Migrant'),
(9, 'Other'),
(10, '555'),
(11, '11'),
(13, '111'),
(14, 'Bi Sex mens'),
(15, 'Bio sex'),
(16, '123');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(255) DEFAULT NULL,
  `role_code` varchar(255) DEFAULT NULL,
  `role_status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `role_name`, `role_code`, `role_status`) VALUES
(1, 'Admin', 'admin', 'active'),
(2, 'User', 'user', 'active'),
(3, 'Viral Load Testing Site', 'VLTS', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `role_id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `app_password` varchar(255) DEFAULT NULL,
  `server_password` varchar(255) DEFAULT NULL,
  `auth_token` varchar(255) DEFAULT NULL,
  `alt_email` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `alt_mobile` varchar(255) DEFAULT NULL,
  `job_responsibility` varchar(255) DEFAULT NULL,
  `comments` varchar(1000) DEFAULT NULL,
  `qc_sync_in_days` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `web_access` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `role_id`, `email`, `app_password`, `server_password`, `auth_token`, `alt_email`, `mobile`, `alt_mobile`, `job_responsibility`, `comments`, `qc_sync_in_days`, `status`, `web_access`) VALUES
(1, 'admin', 1, 'admin@gmail.com', '123', '340257a7b31f401b2174e8ed51bf87385d8a6d16', 'l3nrwfpe51mqve4', 'sadmin@gmail.com', '9994027557', '9876543210', 'Response', '', '', 'active', 'yes'),
(4, 'Test - user', 2, 'test@deforay.com', NULL, '340257a7b31f401b2174e8ed51bf87385d8a6d16', 'a7z92c2y18a0lav', 'test@deforay.com', '9994027557', '09994027557', 'Development', 'Mudiyathu', NULL, 'active', 'yes'),
(5, 'kumar', 2, 'admin1@gmail.com', NULL, '340257a7b31f401b2174e8ed51bf87385d8a6d16', NULL, '', '7894561230', '', 'developer', '', NULL, 'active', NULL),
(6, 'Temp - user', 2, 'temp@gmail.com', NULL, '340257a7b31f401b2174e8ed51bf87385d8a6d16', NULL, '', '88078869210', '', 'devel;oper', '', NULL, 'active', 'yes'),
(7, 'Viral User', 3, 'viral@recency.com', NULL, '340257a7b31f401b2174e8ed51bf87385d8a6d16', NULL, '', '9994027557', '', 'DEV', 'Cmnts', '25', 'active', 'yes');

-- --------------------------------------------------------

--
-- Table structure for table `user_facility_map`
--

CREATE TABLE `user_facility_map` (
  `user_id` varchar(255) NOT NULL,
  `facility_id` varchar(255) NOT NULL DEFAULT 'NULL'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_facility_map`
--

INSERT INTO `user_facility_map` (`user_id`, `facility_id`) VALUES
('4', '1'),
('4', '5'),
('7', '2'),
('7', '3');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `city_details`
--
ALTER TABLE `city_details`
  ADD PRIMARY KEY (`city_id`),
  ADD KEY `city_district_map` (`district_id`);

--
-- Indexes for table `district_details`
--
ALTER TABLE `district_details`
  ADD PRIMARY KEY (`district_id`),
  ADD KEY `district_provience_map` (`province_id`);

--
-- Indexes for table `facilities`
--
ALTER TABLE `facilities`
  ADD PRIMARY KEY (`facility_id`);

--
-- Indexes for table `global_config`
--
ALTER TABLE `global_config`
  ADD PRIMARY KEY (`config_id`);

--
-- Indexes for table `province_details`
--
ALTER TABLE `province_details`
  ADD PRIMARY KEY (`province_id`);

--
-- Indexes for table `quality_check_test`
--
ALTER TABLE `quality_check_test`
  ADD PRIMARY KEY (`qc_test_id`);

--
-- Indexes for table `recency`
--
ALTER TABLE `recency`
  ADD PRIMARY KEY (`recency_id`),
  ADD KEY `facility_foreign_key` (`facility_id`),
  ADD KEY `user_foreign_key` (`added_by`);

--
-- Indexes for table `risk_populations`
--
ALTER TABLE `risk_populations`
  ADD PRIMARY KEY (`rp_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `role_forign_key` (`role_id`);

--
-- Indexes for table `user_facility_map`
--
ALTER TABLE `user_facility_map`
  ADD PRIMARY KEY (`user_id`,`facility_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `city_details`
--
ALTER TABLE `city_details`
  MODIFY `city_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `district_details`
--
ALTER TABLE `district_details`
  MODIFY `district_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `facilities`
--
ALTER TABLE `facilities`
  MODIFY `facility_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `global_config`
--
ALTER TABLE `global_config`
  MODIFY `config_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `province_details`
--
ALTER TABLE `province_details`
  MODIFY `province_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `quality_check_test`
--
ALTER TABLE `quality_check_test`
  MODIFY `qc_test_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT for table `recency`
--
ALTER TABLE `recency`
  MODIFY `recency_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
--
-- AUTO_INCREMENT for table `risk_populations`
--
ALTER TABLE `risk_populations`
  MODIFY `rp_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `city_details`
--
ALTER TABLE `city_details`
  ADD CONSTRAINT `city_district_map` FOREIGN KEY (`district_id`) REFERENCES `district_details` (`district_id`);

--
-- Constraints for table `district_details`
--
ALTER TABLE `district_details`
  ADD CONSTRAINT `district_provience_map` FOREIGN KEY (`province_id`) REFERENCES `province_details` (`province_id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `role_forign_key` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
