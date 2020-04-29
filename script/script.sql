USE [master]
GO
/****** Object:  Database [ICS_test]    Script Date: 4/29/2020 10:23:07 AM ******/
CREATE DATABASE [ICS_test]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'ICS_test', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\ICS_test.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'ICS_test_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\ICS_test_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [ICS_test] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [ICS_test].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [ICS_test] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [ICS_test] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [ICS_test] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [ICS_test] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [ICS_test] SET ARITHABORT OFF 
GO
ALTER DATABASE [ICS_test] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [ICS_test] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [ICS_test] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [ICS_test] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [ICS_test] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [ICS_test] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [ICS_test] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [ICS_test] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [ICS_test] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [ICS_test] SET  ENABLE_BROKER 
GO
ALTER DATABASE [ICS_test] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [ICS_test] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [ICS_test] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [ICS_test] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [ICS_test] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [ICS_test] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [ICS_test] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [ICS_test] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [ICS_test] SET  MULTI_USER 
GO
ALTER DATABASE [ICS_test] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [ICS_test] SET DB_CHAINING OFF 
GO
ALTER DATABASE [ICS_test] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [ICS_test] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [ICS_test] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [ICS_test] SET QUERY_STORE = OFF
GO
USE [ICS_test]
GO
/****** Object:  User [icsAdmin]    Script Date: 4/29/2020 10:23:07 AM ******/
CREATE USER [icsAdmin] FOR LOGIN [icsAdmin] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [icsAdmin]
GO
ALTER ROLE [db_accessadmin] ADD MEMBER [icsAdmin]
GO
ALTER ROLE [db_securityadmin] ADD MEMBER [icsAdmin]
GO
ALTER ROLE [db_ddladmin] ADD MEMBER [icsAdmin]
GO
ALTER ROLE [db_backupoperator] ADD MEMBER [icsAdmin]
GO
ALTER ROLE [db_datareader] ADD MEMBER [icsAdmin]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [icsAdmin]
GO
ALTER ROLE [db_denydatareader] ADD MEMBER [icsAdmin]
GO
ALTER ROLE [db_denydatawriter] ADD MEMBER [icsAdmin]
GO
/****** Object:  Table [dbo].[appointment]    Script Date: 4/29/2020 10:23:07 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[appointment](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[time_slot_id] [int] NOT NULL,
	[first_name] [nvarchar](30) NULL,
	[last_name] [nvarchar](30) NULL,
	[email_address] [nvarchar](50) NULL,
	[pin] [nvarchar](15) NULL,
	[created_by] [varchar](15) NOT NULL,
	[date_created] [datetime] NOT NULL,
	[last_updated_by] [varchar](15) NOT NULL,
	[last_updated] [datetime] NOT NULL,
	[archived] [bit] NOT NULL,
 CONSTRAINT [PK_Appointment] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[location]    Script Date: 4/29/2020 10:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[location](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[code] [nvarchar](50) NULL,
	[name] [nvarchar](200) NULL,
	[time_zone] [varchar](255) NOT NULL,
	[active] [bit] NOT NULL,
	[show_in_sign_up_list] [bit] NOT NULL,
	[created_by] [varchar](15) NOT NULL,
	[date_created] [datetime] NOT NULL,
	[last_updated_by] [varchar](15) NOT NULL,
	[last_updated] [datetime] NOT NULL,
 CONSTRAINT [PK_Location] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[program]    Script Date: 4/29/2020 10:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[program](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[location_id] [int] NOT NULL,
	[name] [nvarchar](100) NULL,
	[venue] [nvarchar](50) NULL,
	[active] [bit] NOT NULL,
	[created_by] [varchar](15) NOT NULL,
	[date_created] [datetime] NOT NULL,
	[last_updated_by] [varchar](15) NOT NULL,
	[last_updated] [datetime] NOT NULL,
	[email_required] [bit] NOT NULL,
 CONSTRAINT [PK_Program] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[program_date]    Script Date: 4/29/2020 10:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[program_date](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[program_id] [int] NOT NULL,
	[date] [datetime] NOT NULL,
	[created_by] [varchar](15) NOT NULL,
	[date_created] [datetime] NOT NULL,
	[last_updated_by] [varchar](15) NOT NULL,
	[last_updated] [datetime] NOT NULL,
 CONSTRAINT [PK_ProgramDate] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[time_slot]    Script Date: 4/29/2020 10:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[time_slot](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[program_date_id] [int] NOT NULL,
	[max_appointments] [int] NOT NULL,
	[start_time] [time](0) NOT NULL,
	[start_time_display] [nvarchar](8) NULL,
	[end_time] [time](0) NOT NULL,
	[end_time_display] [nvarchar](8) NULL,
	[created_by] [varchar](15) NOT NULL,
	[date_created] [datetime] NOT NULL,
	[last_updated_by] [varchar](15) NOT NULL,
	[last_updated] [datetime] NOT NULL,
	[min_appointments_per_user] [int] NOT NULL,
	[max_appointments_per_user] [int] NOT NULL,
 CONSTRAINT [PK_TimeSlot] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[appointment_details_view]    Script Date: 4/29/2020 10:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create view [dbo].[appointment_details_view] as
select l.id as location_id, l.time_zone, p.id as program_id, p.name as program_name, p.venue, pd.date as program_date, ts.start_time, ts.start_time_display, ts.end_time, ts.end_time_display, ap.id as appointment_id, ap.first_name, ap.last_name, ap.email_address, ap.pin
from appointment ap
inner join time_slot ts
on ts.id = ap.time_slot_id
inner join program_date pd
on pd.id = ts.program_date_id
inner join program p
on p.id = pd.program_id
inner join [location] l
on l.id = p.location_id
GO
/****** Object:  Table [dbo].[ics_user]    Script Date: 4/29/2020 10:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ics_user](
	[user_pin] [varchar](15) NOT NULL,
	[first_name] [nvarchar](30) NULL,
	[last_name] [nvarchar](30) NULL,
	[email] [nvarchar](50) NULL,
 CONSTRAINT [PK_IcsUser] PRIMARY KEY CLUSTERED 
(
	[user_pin] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[my_appointments_view]    Script Date: 4/29/2020 10:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[my_appointments_view] AS
SELECT appointment.id, appointment.first_name, appointment.last_name, appointment.time_slot_id, appointment.email_address, appointment.pin,
time_slot.start_time_display, time_slot.end_time_display, program_date.date AS program_date, program.name AS program_name, program_date.program_id,
time_slot.program_date_id, program.location_id, time_slot.start_time, time_slot.end_time, program.venue, appointment.created_by,
ics_user.first_name AS created_by_first_name, ics_user.last_name AS created_by_last_name, appointment.archived
FROM time_slot
INNER JOIN program_date
ON time_slot.program_date_id = program_date.id
INNER JOIN program
ON program_date.program_id = program.id
INNER JOIN appointment
ON time_slot.id = appointment.time_slot_id
LEFT OUTER JOIN ics_user ON appointment.created_by = ics_user.user_pin
GO
/****** Object:  View [dbo].[program_appointment_view]    Script Date: 4/29/2020 10:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO







CREATE VIEW [dbo].[program_appointment_view] AS
select p.id as program_id,
       pd.date as program_date, 
	   a.id as appointment_id, 
	   a.first_name, a.last_name, 
	   a.email_address, a.archived,
	   ts.min_appointments_per_user,
	   ts.max_appointments_per_user  
from program p
inner join program_date pd
on p.id = pd.program_id
inner join time_slot ts
on pd.id = ts.program_date_id
inner join appointment a
on ts.id = a.time_slot_id

-- top (1) 
-- ORDER BY [appointment_id] DESC 

GO
/****** Object:  Table [dbo].[pending_appointment]    Script Date: 4/29/2020 10:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[pending_appointment](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[time_slot_id] [int] NOT NULL,
	[created_by] [varchar](15) NOT NULL,
	[date_created] [datetime] NOT NULL,
 CONSTRAINT [PK_PendingAppointment] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[program_date_time_slot_view]    Script Date: 4/29/2020 10:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE view [dbo].[program_date_time_slot_view] as
select	pd.id as program_date_id,
		ts.id as id,
		ts.start_time,
		ts.end_time,
		ts.start_time_display,
		ts.end_time_display,
		ts.max_appointments,
		ts.min_appointments_per_user,
		ts.max_appointments_per_user,
		ts.max_appointments -
		(select count(*) as appointment_count from appointment a where a.time_slot_id = ts.id) -
		(select count(*) as pending_appointment_count from pending_appointment pa where pa.time_slot_id = ts.id) as available_appointments
from program_date pd
inner join time_slot ts
on pd.id = ts.program_date_id
GO
/****** Object:  Table [dbo].[announcement]    Script Date: 4/29/2020 10:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[announcement](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[location_id] [int] NULL,
	[message] [nvarchar](500) NULL,
	[active] [bit] NOT NULL,
	[created_by] [varchar](15) NOT NULL,
	[date_created] [datetime] NOT NULL,
	[last_updated_by] [varchar](15) NOT NULL,
	[last_updated] [datetime] NOT NULL,
 CONSTRAINT [PK_Announcement] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[announcement_audit]    Script Date: 4/29/2020 10:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[announcement_audit](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RecordHistoryDate] [datetime] NULL,
	[RecordId] [int] NULL,
	[location_id] [int] NULL,
	[message] [nvarchar](500) NULL,
	[active] [bit] NOT NULL,
	[created_by] [varchar](15) NOT NULL,
	[date_created] [datetime] NOT NULL,
	[last_updated_by] [varchar](15) NOT NULL,
	[last_updated] [datetime] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[appointment_audit]    Script Date: 4/29/2020 10:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[appointment_audit](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RecordHistoryDate] [datetime] NULL,
	[RecordId] [int] NULL,
	[time_slot_id] [int] NOT NULL,
	[first_name] [nvarchar](30) NULL,
	[last_name] [nvarchar](30) NULL,
	[email_address] [nvarchar](50) NULL,
	[pin] [nvarchar](15) NULL,
	[created_by] [varchar](15) NOT NULL,
	[date_created] [datetime] NOT NULL,
	[last_updated_by] [varchar](15) NOT NULL,
	[last_updated] [datetime] NOT NULL,
	[archived] [bit] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[appointment_message]    Script Date: 4/29/2020 10:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[appointment_message](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[appointment_id] [int] NOT NULL,
	[message_id] [int] NOT NULL,
 CONSTRAINT [PK_AppointmentMsg] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[appointment_message_audit]    Script Date: 4/29/2020 10:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[appointment_message_audit](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RecordHistoryDate] [datetime] NULL,
	[RecordId] [int] NULL,
	[appointment_id] [int] NOT NULL,
	[message_id] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[async_mail_attachment]    Script Date: 4/29/2020 10:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[async_mail_attachment](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[attachment_name] [nvarchar](255) NULL,
	[content] [varbinary](max) NOT NULL,
	[inline] [bit] NOT NULL,
	[message_id] [int] NOT NULL,
	[mime_type] [nvarchar](255) NULL,
	[attachments_idx] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[async_mail_bcc]    Script Date: 4/29/2020 10:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[async_mail_bcc](
	[message_id] [int] NOT NULL,
	[bcc_string] [nvarchar](256) NULL,
	[bcc_idx] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[async_mail_cc]    Script Date: 4/29/2020 10:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[async_mail_cc](
	[message_id] [int] NOT NULL,
	[cc_string] [nvarchar](256) NULL,
	[cc_idx] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[async_mail_header]    Script Date: 4/29/2020 10:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[async_mail_header](
	[message_id] [int] NOT NULL,
	[header_value] [nvarchar](255) NULL,
	[header_name] [nvarchar](255) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[async_mail_mess]    Script Date: 4/29/2020 10:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[async_mail_mess](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[alternative] [nvarchar](255) NULL,
	[attempt_interval] [int] NOT NULL,
	[attempts_count] [int] NOT NULL,
	[begin_date] [datetime] NOT NULL,
	[create_date] [datetime] NOT NULL,
	[end_date] [datetime] NOT NULL,
	[envelope_from] [nvarchar](256) NULL,
	[from_column] [nvarchar](256) NULL,
	[html] [bit] NOT NULL,
	[last_attempt_date] [datetime] NULL,
	[mark_delete] [bit] NOT NULL,
	[mark_delete_attachments] [bit] NOT NULL,
	[max_attempts_count] [int] NOT NULL,
	[priority] [int] NOT NULL,
	[reply_to] [nvarchar](256) NULL,
	[sent_date] [datetime] NULL,
	[status] [nvarchar](255) NULL,
	[subject] [nvarchar](988) NULL,
	[text] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[async_mail_to]    Script Date: 4/29/2020 10:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[async_mail_to](
	[message_id] [int] NOT NULL,
	[to_string] [nvarchar](256) NULL,
	[to_idx] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Batch_RunDate]    Script Date: 4/29/2020 10:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Batch_RunDate](
	[Id] [int] NOT NULL,
	[Batch_Name] [nvarchar](50) NULL,
	[Last_RunDate] [datetime] NULL,
 CONSTRAINT [PK_Batch_Id] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Batch_RunDate_Audit]    Script Date: 4/29/2020 10:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Batch_RunDate_Audit](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RecordHistoryDate] [datetime] NULL,
	[Batch_Id] [int] NOT NULL,
	[Batch_Name] [nvarchar](50) NULL,
	[Last_RunDate] [datetime] NULL,
 CONSTRAINT [PK_Audit_Id] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[bcc_email]    Script Date: 4/29/2020 10:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[bcc_email](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[location_id] [int] NULL,
	[program_id] [int] NULL,
	[email] [varchar](50) NOT NULL,
	[created_by] [varchar](15) NOT NULL,
	[date_created] [datetime] NOT NULL,
	[last_updated_by] [varchar](15) NOT NULL,
	[last_updated] [datetime] NOT NULL,
 CONSTRAINT [PK_BccEmail] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[bcc_email_audit]    Script Date: 4/29/2020 10:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[bcc_email_audit](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RecordHistoryDate] [datetime] NULL,
	[RecordId] [int] NULL,
	[location_id] [int] NULL,
	[program_id] [int] NULL,
	[email] [nvarchar](50) NULL,
	[created_by] [varchar](15) NOT NULL,
	[date_created] [datetime] NOT NULL,
	[last_updated_by] [varchar](15) NOT NULL,
	[last_updated] [datetime] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[contact_us]    Script Date: 4/29/2020 10:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[contact_us](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[location_id] [int] NOT NULL,
	[message] [nvarchar](500) NULL,
	[created_by] [varchar](15) NOT NULL,
	[date_created] [datetime] NOT NULL,
	[last_updated_by] [varchar](15) NOT NULL,
	[last_updated] [datetime] NOT NULL,
 CONSTRAINT [PK_ContactUs] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[contact_us_audit]    Script Date: 4/29/2020 10:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[contact_us_audit](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RecordHistoryDate] [datetime] NULL,
	[RecordId] [int] NULL,
	[location_id] [int] NOT NULL,
	[message] [nvarchar](500) NULL,
	[created_by] [varchar](15) NOT NULL,
	[date_created] [datetime] NOT NULL,
	[last_updated_by] [varchar](15) NOT NULL,
	[last_updated] [datetime] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[email_template]    Script Date: 4/29/2020 10:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[email_template](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[location_id] [int] NULL,
	[program_id] [int] NULL,
	[template_type] [varchar](20) NOT NULL,
	[subject] [nvarchar](150) NULL,
	[message] [nvarchar](2000) NULL,
	[active] [bit] NOT NULL,
	[created_by] [varchar](15) NOT NULL,
	[date_created] [datetime] NOT NULL,
	[last_updated_by] [varchar](15) NOT NULL,
	[last_updated] [datetime] NOT NULL,
 CONSTRAINT [PK_EmailTemplate] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[email_template_audit]    Script Date: 4/29/2020 10:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[email_template_audit](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RecordHistoryDate] [datetime] NULL,
	[RecordId] [int] NULL,
	[location_id] [int] NULL,
	[program_id] [int] NULL,
	[template_type] [varchar](20) NOT NULL,
	[subject] [nvarchar](150) NULL,
	[message] [nvarchar](2000) NULL,
	[active] [bit] NOT NULL,
	[created_by] [varchar](15) NOT NULL,
	[date_created] [datetime] NOT NULL,
	[last_updated_by] [varchar](15) NOT NULL,
	[last_updated] [datetime] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ics_user_audit]    Script Date: 4/29/2020 10:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ics_user_audit](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RecordHistoryDate] [datetime] NULL,
	[user_pin] [varchar](15) NOT NULL,
	[first_name] [nvarchar](30) NULL,
	[last_name] [nvarchar](30) NULL,
	[email] [nvarchar](50) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ics_user_role]    Script Date: 4/29/2020 10:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ics_user_role](
	[role_code] [varchar](20) NOT NULL,
	[user_pin] [varchar](15) NOT NULL,
 CONSTRAINT [PK_IcsUserRole] PRIMARY KEY CLUSTERED 
(
	[user_pin] ASC,
	[role_code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ics_user_role_audit]    Script Date: 4/29/2020 10:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ics_user_role_audit](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RecordHistoryDate] [datetime] NULL,
	[role_code] [varchar](20) NOT NULL,
	[user_pin] [varchar](15) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[location_audit]    Script Date: 4/29/2020 10:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[location_audit](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RecordHistoryDate] [datetime] NULL,
	[RecordId] [int] NULL,
	[code] [nvarchar](50) NULL,
	[name] [nvarchar](200) NULL,
	[time_zone] [varchar](255) NOT NULL,
	[active] [bit] NOT NULL,
	[created_by] [varchar](15) NOT NULL,
	[date_created] [datetime] NOT NULL,
	[last_updated_by] [varchar](15) NOT NULL,
	[last_updated] [datetime] NOT NULL,
	[show_in_sign_up_list] [bit] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[program_audit]    Script Date: 4/29/2020 10:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[program_audit](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RecordHistoryDate] [datetime] NULL,
	[RecordId] [int] NULL,
	[location_id] [int] NOT NULL,
	[name] [nvarchar](100) NULL,
	[venue] [nvarchar](50) NULL,
	[active] [bit] NOT NULL,
	[created_by] [varchar](15) NOT NULL,
	[date_created] [datetime] NOT NULL,
	[last_updated_by] [varchar](15) NOT NULL,
	[last_updated] [datetime] NOT NULL,
	[email_required] [bit] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[program_date_audit]    Script Date: 4/29/2020 10:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[program_date_audit](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RecordHistoryDate] [datetime] NULL,
	[RecordId] [int] NULL,
	[program_id] [int] NOT NULL,
	[date] [datetime] NOT NULL,
	[created_by] [varchar](15) NOT NULL,
	[date_created] [datetime] NOT NULL,
	[last_updated_by] [varchar](15) NOT NULL,
	[last_updated] [datetime] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[program_owner]    Script Date: 4/29/2020 10:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[program_owner](
	[location_id] [int] NOT NULL,
	[user_pin] [varchar](15) NOT NULL,
 CONSTRAINT [PK_ProgramOwner] PRIMARY KEY CLUSTERED 
(
	[location_id] ASC,
	[user_pin] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[program_owner_audit]    Script Date: 4/29/2020 10:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[program_owner_audit](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RecordHistoryDate] [datetime] NULL,
	[location_id] [int] NOT NULL,
	[user_pin] [varchar](15) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[role]    Script Date: 4/29/2020 10:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[role](
	[code] [varchar](20) NOT NULL,
 CONSTRAINT [PK_Role] PRIMARY KEY CLUSTERED 
(
	[code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[time_slot_audit]    Script Date: 4/29/2020 10:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[time_slot_audit](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RecordHistoryDate] [datetime] NULL,
	[RecordId] [int] NULL,
	[program_date_id] [int] NOT NULL,
	[max_appointments] [int] NOT NULL,
	[start_time] [time](0) NOT NULL,
	[start_time_display] [nvarchar](8) NULL,
	[end_time] [time](0) NOT NULL,
	[end_time_display] [nvarchar](8) NULL,
	[created_by] [varchar](15) NOT NULL,
	[date_created] [datetime] NOT NULL,
	[last_updated_by] [varchar](15) NOT NULL,
	[last_updated] [datetime] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[VEIDUSF832160ICS_WD]    Script Date: 4/29/2020 10:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VEIDUSF832160ICS_WD](
	[PRSN_ID] [varchar](255) NOT NULL,
	[EMAL_ADDR] [varchar](50) NOT NULL,
	[PRSN_FRST_NAME] [varchar](30) NOT NULL,
	[PRSN_LAST_NAME] [varchar](30) NOT NULL,
	[USER_PIN] [varchar](15) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[PRSN_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[appointment_message] ON 

INSERT [dbo].[appointment_message] ([id], [appointment_id], [message_id]) VALUES (1, 8, 1)
SET IDENTITY_INSERT [dbo].[appointment_message] OFF
SET IDENTITY_INSERT [dbo].[async_mail_mess] ON 

INSERT [dbo].[async_mail_mess] ([id], [alternative], [attempt_interval], [attempts_count], [begin_date], [create_date], [end_date], [envelope_from], [from_column], [html], [last_attempt_date], [mark_delete], [mark_delete_attachments], [max_attempts_count], [priority], [reply_to], [sent_date], [status], [subject], [text]) VALUES (1, NULL, 300000, 1, CAST(N'2020-03-19T10:00:02.340' AS DateTime), CAST(N'2020-03-19T10:00:02.340' AS DateTime), CAST(N'2999-12-31T18:30:00.000' AS DateTime), NULL, N'Occupational Medicine <occupational-medicine-scheduler@mmm.com>', 1, CAST(N'2020-03-19T10:00:02.950' AS DateTime), 0, 0, 3, 0, NULL, CAST(N'2020-03-19T10:00:02.950' AS DateTime), N'SENT', N'Appointment Confirmation ', N'<p>Your appointment has been created.</p>')
SET IDENTITY_INSERT [dbo].[async_mail_mess] OFF
INSERT [dbo].[async_mail_to] ([message_id], [to_string], [to_idx]) VALUES (1, N'asy@gmaks.com', 0)
INSERT [dbo].[Batch_RunDate] ([Id], [Batch_Name], [Last_RunDate]) VALUES (1, N'Archive Expired Appointments', CAST(N'2020-04-15T01:00:05.957' AS DateTime))
INSERT [dbo].[ics_user] ([user_pin], [first_name], [last_name], [email]) VALUES (N'A3FCQZZ', N'TESTUSER', N'Youcan', N'asy@gmaks.com')
INSERT [dbo].[ics_user] ([user_pin], [first_name], [last_name], [email]) VALUES (N'TEST_ADMIN', N'Admin', N'Test', N'mistest@mmm.com')
SET IDENTITY_INSERT [dbo].[ics_user_audit] ON 

INSERT [dbo].[ics_user_audit] ([Id], [RecordHistoryDate], [user_pin], [first_name], [last_name], [email]) VALUES (1, CAST(N'2020-03-19T12:30:34.250' AS DateTime), N'TEST_ADMIN', N'ADMIN', N'GREAT', N'TESTEMAIL@GKA.COM')
INSERT [dbo].[ics_user_audit] ([Id], [RecordHistoryDate], [user_pin], [first_name], [last_name], [email]) VALUES (2, CAST(N'2020-03-19T15:45:48.790' AS DateTime), N'A3FCQZZ', N'Youcan', N'TESTUSER Youcan', N'test_email@gmail.com')
SET IDENTITY_INSERT [dbo].[ics_user_audit] OFF
INSERT [dbo].[ics_user_role] ([role_code], [user_pin]) VALUES (N'ROLE_USER', N'A3FCQZZ')
INSERT [dbo].[ics_user_role] ([role_code], [user_pin]) VALUES (N'ROLE_ADMIN', N'TEST_ADMIN')
SET IDENTITY_INSERT [dbo].[ics_user_role_audit] ON 

INSERT [dbo].[ics_user_role_audit] ([Id], [RecordHistoryDate], [role_code], [user_pin]) VALUES (1, CAST(N'2020-03-19T15:44:21.930' AS DateTime), N'ROLE_ADMIN', N'TEST_ADMIN')
INSERT [dbo].[ics_user_role_audit] ([Id], [RecordHistoryDate], [role_code], [user_pin]) VALUES (2, CAST(N'2020-03-19T15:45:48.790' AS DateTime), N'ROLE_USER', N'A3FCQZZ')
SET IDENTITY_INSERT [dbo].[ics_user_role_audit] OFF
SET IDENTITY_INSERT [dbo].[location] ON 

INSERT [dbo].[location] ([id], [code], [name], [time_zone], [active], [show_in_sign_up_list], [created_by], [date_created], [last_updated_by], [last_updated]) VALUES (14, N'3M-Center', N'3M Center', N'America/Chicago', 1, 1, N'A3FCQZZ', CAST(N'2019-08-06T18:56:40.127' AS DateTime), N'A3FCQZZ', CAST(N'2019-08-06T18:56:40.127' AS DateTime))
INSERT [dbo].[location] ([id], [code], [name], [time_zone], [active], [show_in_sign_up_list], [created_by], [date_created], [last_updated_by], [last_updated]) VALUES (15, N'CM', N'Costa Mesa', N'America/Los_Angeles', 1, 1, N'A3FCQZZ', CAST(N'2019-08-06T18:56:51.000' AS DateTime), N'A3FCQZZ', CAST(N'2019-08-06T18:56:51.000' AS DateTime))
SET IDENTITY_INSERT [dbo].[location] OFF
SET IDENTITY_INSERT [dbo].[location_audit] ON 

INSERT [dbo].[location_audit] ([Id], [RecordHistoryDate], [RecordId], [code], [name], [time_zone], [active], [created_by], [date_created], [last_updated_by], [last_updated], [show_in_sign_up_list]) VALUES (1, CAST(N'2020-03-18T14:59:30.173' AS DateTime), 8, N'12', N'US', N'CST', 1, N'A9N6NZZ', CAST(N'2020-03-17T17:20:40.943' AS DateTime), N'A9N6NZZ', CAST(N'2020-03-17T17:20:40.943' AS DateTime), 1)
INSERT [dbo].[location_audit] ([Id], [RecordHistoryDate], [RecordId], [code], [name], [time_zone], [active], [created_by], [date_created], [last_updated_by], [last_updated], [show_in_sign_up_list]) VALUES (2, CAST(N'2020-03-18T14:59:30.173' AS DateTime), 11, N'1687', N'CM	Costa Mesa', N'America/Los_Angeles', 1, N'A3FCQZZ', CAST(N'2019-08-06T18:56:51.000' AS DateTime), N'A3FCQZZ', CAST(N'2019-08-06T18:56:51.000' AS DateTime), 1)
INSERT [dbo].[location_audit] ([Id], [RecordHistoryDate], [RecordId], [code], [name], [time_zone], [active], [created_by], [date_created], [last_updated_by], [last_updated], [show_in_sign_up_list]) VALUES (3, CAST(N'2020-03-18T14:59:30.173' AS DateTime), 13, NULL, N'3M-Center_new', N'3M Center	America/Chicago', 1, N'a9n6nzz', CAST(N'2019-08-06T18:56:40.127' AS DateTime), N'a9n6nzz', CAST(N'2019-08-06T18:56:40.127' AS DateTime), 1)
INSERT [dbo].[location_audit] ([Id], [RecordHistoryDate], [RecordId], [code], [name], [time_zone], [active], [created_by], [date_created], [last_updated_by], [last_updated], [show_in_sign_up_list]) VALUES (4, CAST(N'2020-03-18T14:59:30.173' AS DateTime), 10, N'1686', N'3M-Center', N'3M Center	America/Chicago', 1, N'A3FCQZZ', CAST(N'2019-08-06T18:56:40.127' AS DateTime), N'A3FCQZZ', CAST(N'2019-08-06T18:56:40.127' AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[location_audit] OFF
SET IDENTITY_INSERT [dbo].[program] ON 

INSERT [dbo].[program] ([id], [location_id], [name], [venue], [active], [created_by], [date_created], [last_updated_by], [last_updated], [email_required]) VALUES (1, 14, N'corona flu test', N'3M Hospital --Mineesota', 1, N'TEST_ADMIN', CAST(N'2020-03-19T09:37:52.793' AS DateTime), N'TEST_ADMIN', CAST(N'2020-03-19T09:55:05.860' AS DateTime), 0)
INSERT [dbo].[program] ([id], [location_id], [name], [venue], [active], [created_by], [date_created], [last_updated_by], [last_updated], [email_required]) VALUES (2, 14, N'FLU shot', N'3M US Room', 1, N'TEST_ADMIN', CAST(N'2020-03-19T10:12:30.573' AS DateTime), N'TEST_ADMIN', CAST(N'2020-04-27T17:57:29.817' AS DateTime), 0)
INSERT [dbo].[program] ([id], [location_id], [name], [venue], [active], [created_by], [date_created], [last_updated_by], [last_updated], [email_required]) VALUES (9, 15, N'A New Program', N'India', 1, N'TEST_ADMIN', CAST(N'2020-04-15T12:56:31.120' AS DateTime), N'TEST_ADMIN', CAST(N'2020-04-15T12:56:31.120' AS DateTime), 1)
INSERT [dbo].[program] ([id], [location_id], [name], [venue], [active], [created_by], [date_created], [last_updated_by], [last_updated], [email_required]) VALUES (1009, 15, N'Small Pox Vaccination', N'Tamil Nadu', 1, N'TEST_ADMIN', CAST(N'2020-04-16T07:46:23.047' AS DateTime), N'TEST_ADMIN', CAST(N'2020-04-16T07:46:23.047' AS DateTime), 1)
INSERT [dbo].[program] ([id], [location_id], [name], [venue], [active], [created_by], [date_created], [last_updated_by], [last_updated], [email_required]) VALUES (1010, 14, N'Measles Vaccination -- Single/Multiple slots', N'3M Hospital -- Mineesota', 1, N'TEST_ADMIN', CAST(N'2020-04-16T10:07:30.663' AS DateTime), N'TEST_ADMIN', CAST(N'2020-04-16T10:44:34.117' AS DateTime), 1)
INSERT [dbo].[program] ([id], [location_id], [name], [venue], [active], [created_by], [date_created], [last_updated_by], [last_updated], [email_required]) VALUES (1011, 14, N'Rabies Vaccination', N'3M Hospital--Florida', 1, N'TEST_ADMIN', CAST(N'2020-04-16T14:02:04.343' AS DateTime), N'TEST_ADMIN', CAST(N'2020-04-16T14:02:04.343' AS DateTime), 1)
INSERT [dbo].[program] ([id], [location_id], [name], [venue], [active], [created_by], [date_created], [last_updated_by], [last_updated], [email_required]) VALUES (1012, 14, N'Enhancement Vaccine', N'Home', 1, N'TEST_ADMIN', CAST(N'2020-04-23T08:25:01.473' AS DateTime), N'TEST_ADMIN', CAST(N'2020-04-23T08:58:44.000' AS DateTime), 0)
INSERT [dbo].[program] ([id], [location_id], [name], [venue], [active], [created_by], [date_created], [last_updated_by], [last_updated], [email_required]) VALUES (1013, 14, N'Testing Program', N'Laptop', 1, N'TEST_ADMIN', CAST(N'2020-04-24T06:10:59.513' AS DateTime), N'TEST_ADMIN', CAST(N'2020-04-24T06:10:59.513' AS DateTime), 0)
SET IDENTITY_INSERT [dbo].[program] OFF
SET IDENTITY_INSERT [dbo].[program_audit] ON 

INSERT [dbo].[program_audit] ([Id], [RecordHistoryDate], [RecordId], [location_id], [name], [venue], [active], [created_by], [date_created], [last_updated_by], [last_updated], [email_required]) VALUES (1, CAST(N'2020-03-19T15:25:06.033' AS DateTime), 1, 14, N'corona flu test', N'3M Hospital --Mineesota', 1, N'TEST_ADMIN', CAST(N'2020-03-19T09:37:52.793' AS DateTime), N'TEST_ADMIN', CAST(N'2020-03-19T09:37:52.793' AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[program_audit] OFF
SET IDENTITY_INSERT [dbo].[program_date] ON 

INSERT [dbo].[program_date] ([id], [program_id], [date], [created_by], [date_created], [last_updated_by], [last_updated]) VALUES (1050, 2, CAST(N'2020-04-29T00:00:00.000' AS DateTime), N'TEST_ADMIN', CAST(N'2020-04-27T17:58:43.963' AS DateTime), N'TEST_ADMIN', CAST(N'2020-04-27T17:58:43.963' AS DateTime))
INSERT [dbo].[program_date] ([id], [program_id], [date], [created_by], [date_created], [last_updated_by], [last_updated]) VALUES (1052, 1010, CAST(N'2020-04-29T00:00:00.000' AS DateTime), N'TEST_ADMIN', CAST(N'2020-04-28T06:24:09.360' AS DateTime), N'TEST_ADMIN', CAST(N'2020-04-28T06:24:09.360' AS DateTime))
INSERT [dbo].[program_date] ([id], [program_id], [date], [created_by], [date_created], [last_updated_by], [last_updated]) VALUES (1055, 1012, CAST(N'2020-04-30T00:00:00.000' AS DateTime), N'TEST_ADMIN', CAST(N'2020-04-29T04:44:04.177' AS DateTime), N'TEST_ADMIN', CAST(N'2020-04-29T04:44:04.177' AS DateTime))
SET IDENTITY_INSERT [dbo].[program_date] OFF
INSERT [dbo].[role] ([code]) VALUES (N'ROLE_ADMIN')
INSERT [dbo].[role] ([code]) VALUES (N'ROLE_PROGRAM_OWNER')
INSERT [dbo].[role] ([code]) VALUES (N'ROLE_USER')
SET IDENTITY_INSERT [dbo].[time_slot] ON 

INSERT [dbo].[time_slot] ([id], [program_date_id], [max_appointments], [start_time], [start_time_display], [end_time], [end_time_display], [created_by], [date_created], [last_updated_by], [last_updated], [min_appointments_per_user], [max_appointments_per_user]) VALUES (1158, 1050, 20, CAST(N'08:00:00' AS Time), N'08:00 AM', CAST(N'09:00:00' AS Time), N'09:00 AM', N'TEST_ADMIN', CAST(N'2020-04-28T06:23:46.223' AS DateTime), N'TEST_ADMIN', CAST(N'2020-04-28T06:23:46.223' AS DateTime), 2, 3)
INSERT [dbo].[time_slot] ([id], [program_date_id], [max_appointments], [start_time], [start_time_display], [end_time], [end_time_display], [created_by], [date_created], [last_updated_by], [last_updated], [min_appointments_per_user], [max_appointments_per_user]) VALUES (1159, 1050, 20, CAST(N'09:00:00' AS Time), N'09:00 AM', CAST(N'10:00:00' AS Time), N'10:00 AM', N'TEST_ADMIN', CAST(N'2020-04-28T06:23:46.247' AS DateTime), N'TEST_ADMIN', CAST(N'2020-04-28T06:23:46.247' AS DateTime), 2, 3)
INSERT [dbo].[time_slot] ([id], [program_date_id], [max_appointments], [start_time], [start_time_display], [end_time], [end_time_display], [created_by], [date_created], [last_updated_by], [last_updated], [min_appointments_per_user], [max_appointments_per_user]) VALUES (1160, 1050, 20, CAST(N'10:00:00' AS Time), N'10:00 AM', CAST(N'11:00:00' AS Time), N'11:00 AM', N'TEST_ADMIN', CAST(N'2020-04-28T06:23:46.300' AS DateTime), N'TEST_ADMIN', CAST(N'2020-04-28T06:23:46.300' AS DateTime), 2, 3)
INSERT [dbo].[time_slot] ([id], [program_date_id], [max_appointments], [start_time], [start_time_display], [end_time], [end_time_display], [created_by], [date_created], [last_updated_by], [last_updated], [min_appointments_per_user], [max_appointments_per_user]) VALUES (1161, 1050, 20, CAST(N'11:00:00' AS Time), N'11:00 AM', CAST(N'12:00:00' AS Time), N'12:00 PM', N'TEST_ADMIN', CAST(N'2020-04-28T06:23:46.320' AS DateTime), N'TEST_ADMIN', CAST(N'2020-04-28T06:23:46.320' AS DateTime), 2, 3)
INSERT [dbo].[time_slot] ([id], [program_date_id], [max_appointments], [start_time], [start_time_display], [end_time], [end_time_display], [created_by], [date_created], [last_updated_by], [last_updated], [min_appointments_per_user], [max_appointments_per_user]) VALUES (1162, 1050, 20, CAST(N'12:00:00' AS Time), N'12:00 PM', CAST(N'13:00:00' AS Time), N'01:00 PM', N'TEST_ADMIN', CAST(N'2020-04-28T06:23:46.343' AS DateTime), N'TEST_ADMIN', CAST(N'2020-04-28T06:23:46.343' AS DateTime), 2, 3)
INSERT [dbo].[time_slot] ([id], [program_date_id], [max_appointments], [start_time], [start_time_display], [end_time], [end_time_display], [created_by], [date_created], [last_updated_by], [last_updated], [min_appointments_per_user], [max_appointments_per_user]) VALUES (1163, 1050, 20, CAST(N'13:00:00' AS Time), N'01:00 PM', CAST(N'14:00:00' AS Time), N'02:00 PM', N'TEST_ADMIN', CAST(N'2020-04-28T06:23:46.373' AS DateTime), N'TEST_ADMIN', CAST(N'2020-04-28T06:23:46.373' AS DateTime), 2, 3)
INSERT [dbo].[time_slot] ([id], [program_date_id], [max_appointments], [start_time], [start_time_display], [end_time], [end_time_display], [created_by], [date_created], [last_updated_by], [last_updated], [min_appointments_per_user], [max_appointments_per_user]) VALUES (1164, 1050, 20, CAST(N'14:00:00' AS Time), N'02:00 PM', CAST(N'15:00:00' AS Time), N'03:00 PM', N'TEST_ADMIN', CAST(N'2020-04-28T06:23:46.397' AS DateTime), N'TEST_ADMIN', CAST(N'2020-04-28T06:23:46.397' AS DateTime), 2, 3)
INSERT [dbo].[time_slot] ([id], [program_date_id], [max_appointments], [start_time], [start_time_display], [end_time], [end_time_display], [created_by], [date_created], [last_updated_by], [last_updated], [min_appointments_per_user], [max_appointments_per_user]) VALUES (1165, 1050, 20, CAST(N'15:00:00' AS Time), N'03:00 PM', CAST(N'16:00:00' AS Time), N'04:00 PM', N'TEST_ADMIN', CAST(N'2020-04-28T06:23:46.410' AS DateTime), N'TEST_ADMIN', CAST(N'2020-04-28T06:23:46.410' AS DateTime), 2, 3)
INSERT [dbo].[time_slot] ([id], [program_date_id], [max_appointments], [start_time], [start_time_display], [end_time], [end_time_display], [created_by], [date_created], [last_updated_by], [last_updated], [min_appointments_per_user], [max_appointments_per_user]) VALUES (1166, 1050, 20, CAST(N'16:00:00' AS Time), N'04:00 PM', CAST(N'17:00:00' AS Time), N'05:00 PM', N'TEST_ADMIN', CAST(N'2020-04-28T06:23:46.420' AS DateTime), N'TEST_ADMIN', CAST(N'2020-04-28T06:23:46.420' AS DateTime), 2, 3)
INSERT [dbo].[time_slot] ([id], [program_date_id], [max_appointments], [start_time], [start_time_display], [end_time], [end_time_display], [created_by], [date_created], [last_updated_by], [last_updated], [min_appointments_per_user], [max_appointments_per_user]) VALUES (1167, 1052, 10, CAST(N'08:00:00' AS Time), N'08:00 AM', CAST(N'17:00:00' AS Time), N'05:00 PM', N'TEST_ADMIN', CAST(N'2020-04-28T06:24:09.380' AS DateTime), N'TEST_ADMIN', CAST(N'2020-04-28T06:24:09.380' AS DateTime), 0, 2)
INSERT [dbo].[time_slot] ([id], [program_date_id], [max_appointments], [start_time], [start_time_display], [end_time], [end_time_display], [created_by], [date_created], [last_updated_by], [last_updated], [min_appointments_per_user], [max_appointments_per_user]) VALUES (1170, 1055, 10, CAST(N'08:00:00' AS Time), N'08:00 AM', CAST(N'17:00:00' AS Time), N'05:00 PM', N'TEST_ADMIN', CAST(N'2020-04-29T04:44:04.217' AS DateTime), N'TEST_ADMIN', CAST(N'2020-04-29T04:44:04.217' AS DateTime), 2, 3)
SET IDENTITY_INSERT [dbo].[time_slot] OFF
INSERT [dbo].[VEIDUSF832160ICS_WD] ([PRSN_ID], [EMAL_ADDR], [PRSN_FRST_NAME], [PRSN_LAST_NAME], [USER_PIN]) VALUES (N'0123417', N'mistest@mmm.com', N'Admin', N'Test', N'TEST_ADMIN')
INSERT [dbo].[VEIDUSF832160ICS_WD] ([PRSN_ID], [EMAL_ADDR], [PRSN_FRST_NAME], [PRSN_LAST_NAME], [USER_PIN]) VALUES (N'0123418', N'asy@gmaks.com', N'TESTUSER', N'Youcan', N'A3FCQZZ')
SET ANSI_PADDING ON
GO
/****** Object:  Index [UNIQUE__BCC_EMAIL__Location_Program_Email]    Script Date: 4/29/2020 10:23:09 AM ******/
ALTER TABLE [dbo].[bcc_email] ADD  CONSTRAINT [UNIQUE__BCC_EMAIL__Location_Program_Email] UNIQUE NONCLUSTERED 
(
	[location_id] ASC,
	[program_id] ASC,
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [UNIQUE__CONTACTUS__Location]    Script Date: 4/29/2020 10:23:09 AM ******/
ALTER TABLE [dbo].[contact_us] ADD  CONSTRAINT [UNIQUE__CONTACTUS__Location] UNIQUE NONCLUSTERED 
(
	[location_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UNIQUE__EMAIL_TEMPLATE__Location_Program_Email]    Script Date: 4/29/2020 10:23:09 AM ******/
ALTER TABLE [dbo].[email_template] ADD  CONSTRAINT [UNIQUE__EMAIL_TEMPLATE__Location_Program_Email] UNIQUE NONCLUSTERED 
(
	[location_id] ASC,
	[program_id] ASC,
	[template_type] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UNIQUE__LOCATION__Code]    Script Date: 4/29/2020 10:23:09 AM ******/
ALTER TABLE [dbo].[location] ADD  CONSTRAINT [UNIQUE__LOCATION__Code] UNIQUE NONCLUSTERED 
(
	[code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UNIQUE__LOCATION__Name]    Script Date: 4/29/2020 10:23:09 AM ******/
ALTER TABLE [dbo].[location] ADD  CONSTRAINT [UNIQUE__LOCATION__Name] UNIQUE NONCLUSTERED 
(
	[name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UNIQUE__PROGRAM_Location__Name]    Script Date: 4/29/2020 10:23:09 AM ******/
ALTER TABLE [dbo].[program] ADD  CONSTRAINT [UNIQUE__PROGRAM_Location__Name] UNIQUE NONCLUSTERED 
(
	[location_id] ASC,
	[name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [UNIQUE__PROGRAM_DATE__Program_Date]    Script Date: 4/29/2020 10:23:09 AM ******/
ALTER TABLE [dbo].[program_date] ADD  CONSTRAINT [UNIQUE__PROGRAM_DATE__Program_Date] UNIQUE NONCLUSTERED 
(
	[program_id] ASC,
	[date] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [UNIQUE__TIME_SLOT__Program_StartTime_EndTime]    Script Date: 4/29/2020 10:23:09 AM ******/
ALTER TABLE [dbo].[time_slot] ADD  CONSTRAINT [UNIQUE__TIME_SLOT__Program_StartTime_EndTime] UNIQUE NONCLUSTERED 
(
	[program_date_id] ASC,
	[start_time] ASC,
	[end_time] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[appointment] ADD  DEFAULT ((0)) FOR [archived]
GO
ALTER TABLE [dbo].[appointment_audit] ADD  DEFAULT ((0)) FOR [archived]
GO
ALTER TABLE [dbo].[location_audit] ADD  DEFAULT ((1)) FOR [show_in_sign_up_list]
GO
ALTER TABLE [dbo].[announcement]  WITH CHECK ADD  CONSTRAINT [FK__LOCATION__ANNOUNCEMENT__Location] FOREIGN KEY([location_id])
REFERENCES [dbo].[location] ([id])
GO
ALTER TABLE [dbo].[announcement] CHECK CONSTRAINT [FK__LOCATION__ANNOUNCEMENT__Location]
GO
ALTER TABLE [dbo].[appointment]  WITH CHECK ADD  CONSTRAINT [FK__TIME_SLOT__APPOINTMENT__TimeSlot] FOREIGN KEY([time_slot_id])
REFERENCES [dbo].[time_slot] ([id])
GO
ALTER TABLE [dbo].[appointment] CHECK CONSTRAINT [FK__TIME_SLOT__APPOINTMENT__TimeSlot]
GO
ALTER TABLE [dbo].[async_mail_attachment]  WITH CHECK ADD  CONSTRAINT [FK__ASYNC_MAIL_ATTACHMENT__ASYNC_MAIL_MESS__Message] FOREIGN KEY([message_id])
REFERENCES [dbo].[async_mail_mess] ([id])
GO
ALTER TABLE [dbo].[async_mail_attachment] CHECK CONSTRAINT [FK__ASYNC_MAIL_ATTACHMENT__ASYNC_MAIL_MESS__Message]
GO
ALTER TABLE [dbo].[bcc_email]  WITH CHECK ADD  CONSTRAINT [FK__BCC_EMAIL__LOCATION__Location] FOREIGN KEY([location_id])
REFERENCES [dbo].[location] ([id])
GO
ALTER TABLE [dbo].[bcc_email] CHECK CONSTRAINT [FK__BCC_EMAIL__LOCATION__Location]
GO
ALTER TABLE [dbo].[bcc_email]  WITH CHECK ADD  CONSTRAINT [FK__BCC_EMAIL__PROGRAM__Program] FOREIGN KEY([program_id])
REFERENCES [dbo].[program] ([id])
GO
ALTER TABLE [dbo].[bcc_email] CHECK CONSTRAINT [FK__BCC_EMAIL__PROGRAM__Program]
GO
ALTER TABLE [dbo].[contact_us]  WITH CHECK ADD  CONSTRAINT [FK__LOCATION__CONTACTUS__Location] FOREIGN KEY([location_id])
REFERENCES [dbo].[location] ([id])
GO
ALTER TABLE [dbo].[contact_us] CHECK CONSTRAINT [FK__LOCATION__CONTACTUS__Location]
GO
ALTER TABLE [dbo].[email_template]  WITH CHECK ADD  CONSTRAINT [FK__EMAIL_TEMPLATE__LOCATION__Location] FOREIGN KEY([location_id])
REFERENCES [dbo].[location] ([id])
GO
ALTER TABLE [dbo].[email_template] CHECK CONSTRAINT [FK__EMAIL_TEMPLATE__LOCATION__Location]
GO
ALTER TABLE [dbo].[email_template]  WITH CHECK ADD  CONSTRAINT [FK__EMAIL_TEMPLATE__PROGRAM__Program] FOREIGN KEY([program_id])
REFERENCES [dbo].[program] ([id])
GO
ALTER TABLE [dbo].[email_template] CHECK CONSTRAINT [FK__EMAIL_TEMPLATE__PROGRAM__Program]
GO
ALTER TABLE [dbo].[ics_user_role]  WITH CHECK ADD  CONSTRAINT [FK__ICS_USER_ROLE__ICS_USER__UserPin] FOREIGN KEY([user_pin])
REFERENCES [dbo].[ics_user] ([user_pin])
GO
ALTER TABLE [dbo].[ics_user_role] CHECK CONSTRAINT [FK__ICS_USER_ROLE__ICS_USER__UserPin]
GO
ALTER TABLE [dbo].[ics_user_role]  WITH CHECK ADD  CONSTRAINT [FK__ICS_USER_ROLE__ROLE__RoleCode] FOREIGN KEY([role_code])
REFERENCES [dbo].[role] ([code])
GO
ALTER TABLE [dbo].[ics_user_role] CHECK CONSTRAINT [FK__ICS_USER_ROLE__ROLE__RoleCode]
GO
ALTER TABLE [dbo].[pending_appointment]  WITH CHECK ADD  CONSTRAINT [FK__PENDING_APPOINTMENT__TIME_SLOT__TimeSlot] FOREIGN KEY([time_slot_id])
REFERENCES [dbo].[time_slot] ([id])
GO
ALTER TABLE [dbo].[pending_appointment] CHECK CONSTRAINT [FK__PENDING_APPOINTMENT__TIME_SLOT__TimeSlot]
GO
ALTER TABLE [dbo].[program]  WITH CHECK ADD  CONSTRAINT [FK__PROGRAM__LOCATION__Location] FOREIGN KEY([location_id])
REFERENCES [dbo].[location] ([id])
GO
ALTER TABLE [dbo].[program] CHECK CONSTRAINT [FK__PROGRAM__LOCATION__Location]
GO
ALTER TABLE [dbo].[program_date]  WITH CHECK ADD  CONSTRAINT [FK__PROGRAM_DATE__PROGRAM__Program] FOREIGN KEY([program_id])
REFERENCES [dbo].[program] ([id])
GO
ALTER TABLE [dbo].[program_date] CHECK CONSTRAINT [FK__PROGRAM_DATE__PROGRAM__Program]
GO
ALTER TABLE [dbo].[program_owner]  WITH CHECK ADD  CONSTRAINT [FK__PROGRAM_OWNER__LOCATION__Location] FOREIGN KEY([location_id])
REFERENCES [dbo].[location] ([id])
GO
ALTER TABLE [dbo].[program_owner] CHECK CONSTRAINT [FK__PROGRAM_OWNER__LOCATION__Location]
GO
ALTER TABLE [dbo].[program_owner]  WITH CHECK ADD  CONSTRAINT [FK__PROGRAM_OWNER__LOCATION__UserPin] FOREIGN KEY([user_pin])
REFERENCES [dbo].[ics_user] ([user_pin])
GO
ALTER TABLE [dbo].[program_owner] CHECK CONSTRAINT [FK__PROGRAM_OWNER__LOCATION__UserPin]
GO
ALTER TABLE [dbo].[time_slot]  WITH CHECK ADD  CONSTRAINT [FK__TIME_SLOT__PROGRAM_DATE__ProgramDate] FOREIGN KEY([program_date_id])
REFERENCES [dbo].[program_date] ([id])
GO
ALTER TABLE [dbo].[time_slot] CHECK CONSTRAINT [FK__TIME_SLOT__PROGRAM_DATE__ProgramDate]
GO
USE [master]
GO
ALTER DATABASE [ICS_test] SET  READ_WRITE 
GO
