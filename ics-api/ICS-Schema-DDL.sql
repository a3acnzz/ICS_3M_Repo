create table dbo.announcement
	(id int identity(1,1) not null,
	 location_id int,
	 message varchar(500) not null,
	 active bit not null,
	 created_by varchar(15) not null,
	 date_created datetime not null,
	 last_updated_by varchar(15) not null,
	 last_updated datetime not null,
	 constraint PK_Announcement primary key clustered
	 (id asc));

create table dbo.appointment
	(id int identity(1,1) not null,
	 time_slot_id int not null,
	 first_name varchar(30) not null,
	 last_name varchar(30) not null,
	 email_address varchar(50) not null,
	 pin varchar(15),
	 created_by varchar(15) not null,
	 date_created datetime not null,
	 last_updated_by varchar(15) not null,
	 last_updated datetime not null,
	 constraint PK_Appointment primary key clustered
	 (id asc));

create table dbo.async_mail_attachment
	(id int identity(1,1) not null,
	 attachment_name varchar(255) not null,
	 content varbinary(max) not null,
	 inline bit not null,
	 message_id int not null,
	 mime_type varchar(255) not null,
	 attachments_idx integer,
	 primary key (id));

create table dbo.async_mail_bcc
	(message_id int not null,
	 bcc_string varchar(256),
	 bcc_idx integer);

create table dbo.async_mail_cc
	(message_id int not null,
	 cc_string varchar(256),
	 cc_idx integer);

create table dbo.async_mail_header
	(message_id int not null,
	 header_value varchar(255),
	 header_name varchar(255));

create table dbo.async_mail_mess
	(id int identity(1,1) not null,
	 alternative varchar(255),
	 attempt_interval int not null,
	 attempts_count integer not null,
	 begin_date datetime not null,
	 create_date datetime not null,
	 end_date datetime not null,
	 envelope_from varchar(256),
	 from_column varchar(256),
	 html bit not null,
	 last_attempt_date datetime,
	 mark_delete bit not null,
	 mark_delete_attachments bit not null,
	 max_attempts_count integer not null,
	 priority integer not null,
	 reply_to varchar(256),
	 sent_date datetime,
	 status varchar(255) not null,
	 subject varchar(988) not null,
	 text varchar(max) not null,
	 primary key (id));

create table dbo.async_mail_to
	(message_id int not null,
	 to_string varchar(256),
	 to_idx integer);

create table dbo.bcc_email
	(id int identity(1,1) not null,
	 location_id int,
	 program_id int,
	 email varchar(50) not null,
	 created_by varchar(15) not null,
	 date_created datetime not null,
	 last_updated_by varchar(15) not null,
	 last_updated datetime not null,
	 constraint PK_BccEmail primary key clustered
	 (id asc));

create table dbo.email_template
	(id int identity(1,1) not null,
	 location_id int,
	 program_id int,
	 template_type varchar(20) not null,
	 subject varchar(50) not null,
	 message varchar(1000) not null,
	 active bit not null,
	 created_by varchar(15) not null,
	 date_created datetime not null,
	 last_updated_by varchar(15) not null,
	 last_updated datetime not null,
	 constraint PK_EmailTemplate primary key clustered
	 (id asc));

create table dbo.location
	(id int identity(1,1) not null,
	 code varchar(50) not null,
	 name varchar(200) not null,
	 time_zone varchar(255) not null,
	 active bit not null,
	 show_in_sign_up_list bit not null,
	 created_by varchar(15) not null,
	 date_created datetime not null,
	 last_updated_by varchar(15) not null,
	 last_updated datetime not null,
	 constraint PK_Location primary key clustered
	 (id asc));

create table dbo.ics_user
	(user_pin varchar(15) not null,
	 first_name varchar(30) not null,
	 last_name varchar(30) not null,
	 email varchar(50) not null,
	 constraint PK_IcsUser primary key clustered
	 (user_pin asc));


create table dbo.ics_user_role
	(role_code varchar(20) not null,
	 user_pin varchar(15) not null,
	 constraint PK_IcsUserRole primary key clustered
	 (user_pin, role_code asc));

create table dbo.pending_appointment
	(id int identity(1,1) not null,
	 time_slot_id int not null,
	 created_by varchar(15) not null,
	 date_created datetime not null,
	 constraint PK_PendingAppointment primary key clustered
	 (id asc));

create table dbo.program
	(id int identity(1,1) not null,
	 location_id int not null,
	 name varchar(100) not null,
	 venue varchar(50) not null,
	 active bit not null,
	 created_by varchar(15) not null,
	 date_created datetime not null,
	 last_updated_by varchar(15) not null,
	 last_updated datetime not null,
	 constraint PK_Program primary key clustered
	 (id asc));

create table dbo.program_date
	(id int identity(1,1) not null,
	 program_id int not null,
	 date datetime not null,
	 created_by varchar(15) not null,
	 date_created datetime not null,
	 last_updated_by varchar(15) not null,
	 last_updated datetime not null,
	 constraint PK_ProgramDate primary key clustered
	 (id asc));

create table dbo.program_owner
	(location_id int not null,
	 user_pin varchar(15) not null
	 constraint PK_ProgramOwner primary key clustered
	 (location_id, user_pin asc));

create table dbo.role
	(code varchar(20) not null,
	 constraint PK_Role primary key clustered
	 (code asc));

create table dbo.time_slot
	(id int identity(1,1) not null,
	 program_date_id int not null,
	 max_appointments integer not null,
	 start_time time(0) not null,
	 start_time_display varchar(8) not null,
	 end_time time(0) not null,
	 end_time_display varchar(8) not null,
	 created_by varchar(15) not null,
	 date_created datetime not null,
	 last_updated_by varchar(15) not null,
	 last_updated datetime not null,
	 constraint PK_TimeSlot primary key clustered
	 (id asc));

create table dbo.appointment_message
	(id int identity(1,1) not null,
	 appointment_id int not null,
	 message_id int not null,
	 constraint PK_AppointmentMsg primary key clustered
	 (id asc));

CREATE TABLE [dbo].[contact_us](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[location_id] [int] NOT NULL,
	[message] [varchar](500) NOT NULL,
	[created_by] [varchar](15) NOT NULL,
	[date_created] [datetime] NOT NULL,
	[last_updated_by] [varchar](15) NOT NULL,
	[last_updated] [datetime] NOT NULL,
	constraint PK_ContactUs primary key clustered (id asc));

alter table [dbo].[contact_us] add constraint UNIQUE__CONTACTUS__Location unique (location_id);
alter table [dbo].[contact_us]  WITH CHECK ADD  CONSTRAINT [FK__LOCATION__CONTACTUS__Location] FOREIGN KEY([location_id]) REFERENCES [dbo].[location] ([id]);
alter table [dbo].[contact_us] CHECK CONSTRAINT [FK__LOCATION__CONTACTUS__Location];

alter table announcement add constraint UNIQUE__ANNOUNCEMENT__Location unique (location_id);
alter table bcc_email add constraint UNIQUE__BCC_EMAIL__Location_Program_Email unique (location_id, program_id, email);
alter table email_template add constraint UNIQUE__EMAIL_TEMPLATE__Location_Program_Email unique (location_id, program_id, template_type);
alter table location add constraint UNIQUE__LOCATION__Code unique (code);
alter table location add constraint UNIQUE__LOCATION__Name unique (name);
alter table program add constraint UNIQUE__PROGRAM_Location__Name unique (location_id, name);
alter table program_date add constraint UNIQUE__PROGRAM_DATE__Program_Date unique (program_id, date);
alter table time_slot add constraint UNIQUE__TIME_SLOT__Program_StartTime_EndTime unique (program_date_id, start_time, end_time);

alter table announcement add constraint FK__LOCATION__ANNOUNCEMENT__Location foreign key (location_id) references location;
alter table appointment add constraint FK__TIME_SLOT__APPOINTMENT__TimeSlot foreign key (time_slot_id) references time_slot;
alter table async_mail_attachment add constraint FK__ASYNC_MAIL_ATTACHMENT__ASYNC_MAIL_MESS__Message foreign key (message_id) references async_mail_mess;
alter table bcc_email add constraint FK__BCC_EMAIL__LOCATION__Location foreign key (location_id) references location;
alter table bcc_email add constraint FK__BCC_EMAIL__PROGRAM__Program foreign key (program_id) references program;
alter table email_template add constraint FK__EMAIL_TEMPLATE__LOCATION__Location foreign key (location_id) references location;
alter table email_template add constraint FK__EMAIL_TEMPLATE__PROGRAM__Program foreign key (program_id) references program;
alter table ics_user_role add constraint FK__ICS_USER_ROLE__ICS_USER__UserPin foreign key (user_pin) references ics_user;
alter table ics_user_role add constraint FK__ICS_USER_ROLE__ROLE__RoleCode foreign key (role_code) references role;
alter table pending_appointment add constraint FK__PENDING_APPOINTMENT__TIME_SLOT__TimeSlot foreign key (time_slot_id) references time_slot;
alter table program add constraint FK__PROGRAM__LOCATION__Location foreign key (location_id) references location;
alter table program_date add constraint FK__PROGRAM_DATE__PROGRAM__Program foreign key (program_id) references program;
alter table program_owner add constraint FK__PROGRAM_OWNER__LOCATION__Location foreign key (location_id) references location;
alter table program_owner add constraint FK__PROGRAM_OWNER__LOCATION__UserPin foreign key (user_pin) references ics_user;
alter table time_slot add constraint FK__TIME_SLOT__PROGRAM_DATE__ProgramDate foreign key (program_date_id) references program_date;

------ Sprint 10
alter table appointment add archived bit not null default 0

CREATE TABLE [dbo].[Batch_RunDate](
	[Id] [int] NOT NULL,
	[Batch_Name] [varchar](50) NOT NULL,
	[Last_RunDate] [datetime] NULL,
	constraint PK_Batch_Id primary key clustered (Id asc));


CREATE TABLE [dbo].[Batch_RunDate_Audit](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RecordHistoryDate] [datetime] NULL,
	[Batch_Id] [int] NOT NULL,
	[Batch_Name] [varchar](50) NOT NULL,
	[Last_RunDate] [datetime] NULL,
	constraint PK_Audit_Id primary key clustered (Id asc));


CREATE TRIGGER [dbo].[TRG_BatchRunDate] ON [dbo].[Batch_RunDate] FOR  UPDATE
AS
  INSERT into Batch_RunDate_Audit (RecordHistoryDate,Batch_Id,Batch_Name,Last_RunDate)
    SELECT getdate(), D.* FROM DELETED D
Go


insert into Batch_Rundate
select 1, 'Archive Expired Appointments', null
------------------------------------------------------

--Audit tables
CREATE TABLE [dbo].[announcement_audit] (
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RecordHistoryDate] [datetime] NULL,
	[RecordId] [int] NULL,
	[location_id] [int] NULL,
	[message] [varchar](500) NOT NULL,
	[active] [bit] NOT NULL,
	[created_by] [varchar](15) NOT NULL,
	[date_created] [datetime] NOT NULL,
	[last_updated_by] [varchar](15) NOT NULL,
	[last_updated] [datetime] NOT NULL)


CREATE TRIGGER [dbo].[TRG_announcement] ON [dbo].[announcement] FOR  UPDATE, DELETE
AS
  INSERT into announcement_audit (RecordHistoryDate,RecordId,location_id,message, active,created_by,date_created,last_updated_by, last_updated )
    SELECT getdate(), D.* FROM DELETED D

GO

----------------------------------------------------------

CREATE TABLE [dbo].[appointment_audit](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RecordHistoryDate] [datetime] NULL,
	[RecordId] [int] NULL,
	[time_slot_id] [int] NOT NULL,
	[first_name] [varchar](30) NOT NULL,
	[last_name] [varchar](30) NOT NULL,
	[email_address] [varchar](50) NOT NULL,
	[pin] [varchar](15) NULL,
	[created_by] [varchar](15) NOT NULL,
	[date_created] [datetime] NOT NULL,
	[last_updated_by] [varchar](15) NOT NULL,
	[last_updated] [datetime] NOT NULL,
	[archived] [bit] NOT NULL DEFAULT ((0)))

CREATE TRIGGER [dbo].[TRG_appointment] ON [dbo].[appointment] FOR  UPDATE, DELETE
AS
  INSERT into appointment_audit (RecordHistoryDate,RecordId,time_slot_id,first_name, last_name,email_address,pin,created_by, date_created, last_updated_by, last_updated, archived )
    SELECT getdate(), D.* FROM DELETED D

GO

----------------------------------------------------------

CREATE TABLE [dbo].[appointment_message_audit](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RecordHistoryDate] [datetime] NULL,
	[RecordId] [int] NULL,
	[appointment_id] [int] NOT NULL,
	[message_id] [int] NOT NULL)

CREATE TRIGGER [dbo].[TRG_appointment_message] ON [dbo].[appointment_message] FOR  UPDATE, DELETE
AS
  INSERT into appointment_message_audit (RecordHistoryDate,RecordId,appointment_id,message_id)
    SELECT getdate(), D.* FROM DELETED D

GO

----------------------------------------------------------

CREATE TABLE [dbo].[bcc_email_audit](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RecordHistoryDate] [datetime] NULL,
	[RecordId] [int] NULL,
	[location_id] [int] NULL,
	[program_id] [int] NULL,
	[email] [varchar](50) NOT NULL,
	[created_by] [varchar](15) NOT NULL,
	[date_created] [datetime] NOT NULL,
	[last_updated_by] [varchar](15) NOT NULL,
	[last_updated] [datetime] NOT NULL)

CREATE TRIGGER [dbo].[TRG_bcc_email] ON [dbo].[bcc_email] FOR  UPDATE, DELETE
AS
  INSERT into bcc_email_audit (RecordHistoryDate,RecordId,location_id,program_id, email, created_by,date_created,last_updated_by,last_updated )
    SELECT getdate(), D.* FROM DELETED D

GO

----------------------------------------------------------

CREATE TABLE [dbo].[contact_us_audit](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RecordHistoryDate] [datetime] NULL,
	[RecordId] [int] NULL,
	[location_id] [int] NOT NULL,
	[message] [varchar](500) NOT NULL,
	[created_by] [varchar](15) NOT NULL,
	[date_created] [datetime] NOT NULL,
	[last_updated_by] [varchar](15) NOT NULL,
	[last_updated] [datetime] NOT NULL)

CREATE TRIGGER [dbo].[TRG_contact_us] ON [dbo].[contact_us] FOR  UPDATE, DELETE
AS
  INSERT into contact_us_audit (RecordHistoryDate,RecordId,location_id,message, created_by, date_created,last_updated_by,last_updated )
    SELECT getdate(), D.* FROM DELETED D

GO

----------------------------------------------------------

CREATE TABLE [dbo].[email_template_audit](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RecordHistoryDate] [datetime] NULL,
	[RecordId] [int] NULL,
	[location_id] [int] NULL,
	[program_id] [int] NULL,
	[template_type] [varchar](20) NOT NULL,
	[subject] [varchar](50) NOT NULL,
	[message] [varchar](1000) NOT NULL,
	[active] [bit] NOT NULL,
	[created_by] [varchar](15) NOT NULL,
	[date_created] [datetime] NOT NULL,
	[last_updated_by] [varchar](15) NOT NULL,
	[last_updated] [datetime] NOT NULL)

CREATE TRIGGER [dbo].[TRG_email_template] ON [dbo].[email_template] FOR  UPDATE, DELETE
AS
  INSERT into email_template_audit (RecordHistoryDate,RecordId,location_id,program_id, template_type,subject,message, active, created_by, date_created,last_updated_by,last_updated )
    SELECT getdate(), D.* FROM DELETED D

GO


----------------------------------------------------------

CREATE TABLE [dbo].[location_audit](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RecordHistoryDate] [datetime] NULL,
	[RecordId] [int] NULL,
	[code] [varchar](50) NOT NULL,
	[name] [varchar](200) NOT NULL,
	[time_zone] [varchar](255) NOT NULL,
	[active] [bit] NOT NULL,
	[created_by] [varchar](15) NOT NULL,
	[date_created] [datetime] NOT NULL,
	[last_updated_by] [varchar](15) NOT NULL,
	[last_updated] [datetime] NOT NULL,
	[show_in_sign_up_list] [bit] NOT NULL DEFAULT ((1)))

CREATE TRIGGER [dbo].[TRG_location] ON [dbo].[location] FOR  UPDATE, DELETE
AS
  INSERT into location_audit (RecordHistoryDate,RecordId,code,name, time_zone,active, show_in_sign_up_list, created_by, date_created,last_updated_by,last_updated )
    SELECT getdate(), D.* FROM DELETED D

GO


----------------------------------------------------------

CREATE TABLE [dbo].[ics_user_audit](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RecordHistoryDate] [datetime] NULL,
	[user_pin] [varchar](15) NOT NULL,
	[first_name] [varchar](30) NOT NULL,
	[last_name] [varchar](30) NOT NULL,
	[email] [varchar](50) NOT NULL)

CREATE TRIGGER [dbo].[TRG_ics_user] ON [dbo].[ics_user] FOR  UPDATE, DELETE
AS
  INSERT into ics_user_audit (RecordHistoryDate,user_pin,first_name, last_name,email)
    SELECT getdate(), D.* FROM DELETED D

GO

----------------------------------------------------------

CREATE TABLE [dbo].[ics_user_role_audit](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RecordHistoryDate] [datetime] NULL,
	[role_code] [varchar](20) NOT NULL,
	[user_pin] [varchar](15) NOT NULL)

CREATE TRIGGER [dbo].[TRG_ics_user_role] ON [dbo].[ics_user_role] FOR  UPDATE, DELETE
AS
  INSERT into ics_user_role_audit (RecordHistoryDate,role_code,user_pin )
    SELECT getdate(), D.* FROM DELETED D

GO


----------------------------------------------------------

CREATE TABLE [dbo].[program_audit](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RecordHistoryDate] [datetime] NULL,
	[RecordId] [int] NULL,
	[location_id] [int] NOT NULL,
	[name] [varchar](100) NOT NULL,
	[venue] [varchar](50) NOT NULL,
	[active] [bit] NOT NULL,
	[created_by] [varchar](15) NOT NULL,
	[date_created] [datetime] NOT NULL,
	[last_updated_by] [varchar](15) NOT NULL,
	[last_updated] [datetime] NOT NULL)

CREATE TRIGGER [dbo].[TRG_program] ON [dbo].[program] FOR  UPDATE, DELETE
AS
  INSERT into program_audit (RecordHistoryDate,RecordId,location_id,name, venue,active,created_by, date_created,last_updated_by,last_updated )
    SELECT getdate(), D.* FROM DELETED D

GO


----------------------------------------------------------

CREATE TABLE [dbo].[program_date_audit](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RecordHistoryDate] [datetime] NULL,
	[RecordId] [int] NULL,
	[program_id] [int] NOT NULL,
	[date] [datetime] NOT NULL,
	[created_by] [varchar](15) NOT NULL,
	[date_created] [datetime] NOT NULL,
	[last_updated_by] [varchar](15) NOT NULL,
	[last_updated] [datetime] NOT NULL)

CREATE TRIGGER [dbo].[TRG_program_date] ON [dbo].[program_date] FOR  UPDATE, DELETE
AS
  INSERT into program_date_audit (RecordHistoryDate,RecordId,program_id,date, created_by,date_created, last_updated_by,last_updated )
    SELECT getdate(), D.* FROM DELETED D

GO

----------------------------------------------------------
CREATE TABLE [dbo].[program_owner_audit](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RecordHistoryDate] [datetime] NULL,
	[location_id] [int] NOT NULL,
	[user_pin] [varchar](15) NOT NULL)

CREATE TRIGGER [dbo].[TRG_program_owner] ON [dbo].[program_owner] FOR  UPDATE, DELETE
AS
  INSERT into program_owner_audit (RecordHistoryDate,location_id,user_pin )
    SELECT getdate(), D.* FROM DELETED D

GO

----------------------------------------------------------

CREATE TABLE [dbo].[time_slot_audit](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RecordHistoryDate] [datetime] NULL,
	[RecordId] [int] NULL,
	[program_date_id] [int] NOT NULL,
	[max_appointments] [int] NOT NULL,
	[start_time] [time](0) NOT NULL,
	[start_time_display] [varchar](8) NOT NULL,
	[end_time] [time](0) NOT NULL,
	[end_time_display] [varchar](8) NOT NULL,
	[created_by] [varchar](15) NOT NULL,
	[date_created] [datetime] NOT NULL,
	[last_updated_by] [varchar](15) NOT NULL,
	[last_updated] [datetime] NOT NULL)

CREATE TRIGGER [dbo].[TRG_time_slot] ON [dbo].[time_slot] FOR  UPDATE, DELETE
AS
  INSERT into time_slot_audit (RecordHistoryDate,RecordId,program_date_id,max_appointments, start_time,start_time_display, end_time,  end_time_display, created_by,date_created, last_updated_by,last_updated )
    SELECT getdate(), D.* FROM DELETED D

GO

---

CREATE VIEW program_appointment_view AS
select p.id as program_id, pd.date as program_date, a.id as appointment_id, a.first_name, a.last_name, a.email_address, a.archived
from program p
inner join program_date pd
on p.id = pd.program_id
inner join time_slot ts
on pd.id = ts.program_date_id
inner join appointment a
on ts.id = a.time_slot_id;


---

create view program_date_time_slot_view as
select	pd.id as program_date_id,
		ts.id as id,
		ts.start_time,
		ts.end_time,
		ts.start_time_display,
		ts.end_time_display,
		ts.max_appointments,
		ts.max_appointments -
		(select count(*) as appointment_count from appointment a where a.time_slot_id = ts.id) -
		(select count(*) as pending_appointment_count from pending_appointment pa where pa.time_slot_id = ts.id) as available_appointments
from program_date pd
inner join time_slot ts
on pd.id = ts.program_date_id

---

create view appointment_details_view as
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

---

CREATE VIEW my_appointments_view AS
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

---

-- Index to improve appointment validation performance
CREATE NONCLUSTERED INDEX IDX_NC__Appointment__FirstName_LastName_Email_Archived
ON [dbo].[appointment] ([first_name],[last_name],[email_address],[archived])
INCLUDE ([id],[time_slot_id])
GO

---

--Index to improve performance for selecting a program date
CREATE NONCLUSTERED INDEX IDX_NC__Appointment__TimeSlotId
ON [dbo].[appointment] ([time_slot_id])
GO

---

--Increase subject and body length for email templates
ALTER TABLE email_template
ALTER COLUMN [subject] VARCHAR(150) NOT NULL;

ALTER TABLE email_template
ALTER COLUMN [message] VARCHAR(2000) NOT NULL;

ALTER TABLE email_template_audit
ALTER COLUMN [subject] VARCHAR(150) NOT NULL;

ALTER TABLE email_template_audit
ALTER COLUMN [message] VARCHAR(2000) NOT NULL;

---

-- Database Support for double-byte characters (MIS-802)

-- Announcement
ALTER TABLE [announcement] ALTER COLUMN [message] NVARCHAR(500);
ALTER TABLE [announcement_audit] ALTER COLUMN [message] NVARCHAR(500);

-- Appointment
DROP INDEX IDX_NC__Appointment__FirstName_LastName_Email_Archived ON [appointment];

ALTER TABLE [appointment] ALTER COLUMN [email_address] NVARCHAR(50);
ALTER TABLE [appointment] ALTER COLUMN [first_name] NVARCHAR(30);
ALTER TABLE [appointment] ALTER COLUMN [last_name] NVARCHAR(30);
ALTER TABLE [appointment] ALTER COLUMN [pin] NVARCHAR(15);
ALTER TABLE [appointment_audit] ALTER COLUMN [email_address] NVARCHAR(50);
ALTER TABLE [appointment_audit] ALTER COLUMN [first_name] NVARCHAR(30);
ALTER TABLE [appointment_audit] ALTER COLUMN [last_name] NVARCHAR(30);
ALTER TABLE [appointment_audit] ALTER COLUMN [pin] NVARCHAR(15);

-- Index to improve appointment validation performance
CREATE NONCLUSTERED INDEX IDX_NC__Appointment__FirstName_LastName_Email_Archived
ON [dbo].[appointment] ([first_name],[last_name],[email_address],[archived])
INCLUDE ([id],[time_slot_id])
GO

-- Async Mail
ALTER TABLE [async_mail_attachment] ALTER COLUMN [attachment_name] NVARCHAR(255);
ALTER TABLE [async_mail_attachment] ALTER COLUMN [mime_type] NVARCHAR(255);
ALTER TABLE [async_mail_bcc] ALTER COLUMN [bcc_string] NVARCHAR(256);
ALTER TABLE [async_mail_cc] ALTER COLUMN [cc_string] NVARCHAR(256);
ALTER TABLE [async_mail_header] ALTER COLUMN [header_name] NVARCHAR(255);
ALTER TABLE [async_mail_header] ALTER COLUMN [header_value] NVARCHAR(255);
ALTER TABLE [async_mail_mess] ALTER COLUMN [alternative] NVARCHAR(255);
ALTER TABLE [async_mail_mess] ALTER COLUMN [envelope_from] NVARCHAR(256);
ALTER TABLE [async_mail_mess] ALTER COLUMN [from_column] NVARCHAR(256);
ALTER TABLE [async_mail_mess] ALTER COLUMN [reply_to] NVARCHAR(256);
ALTER TABLE [async_mail_mess] ALTER COLUMN [status] NVARCHAR(255);
ALTER TABLE [async_mail_mess] ALTER COLUMN [subject] NVARCHAR(988);
ALTER TABLE [async_mail_mess] ALTER COLUMN [text] NVARCHAR(max);
ALTER TABLE [async_mail_to] ALTER COLUMN [to_string] NVARCHAR(256);

-- Batch run date
ALTER TABLE [Batch_RunDate] ALTER COLUMN [Batch_Name] NVARCHAR(50);
ALTER TABLE [Batch_RunDate_Audit] ALTER COLUMN [Batch_Name] NVARCHAR(50);

-- BCC emails
ALTER TABLE [bcc_email] ALTER COLUMN [email] NVARCHAR(50);
ALTER TABLE [bcc_email_audit] ALTER COLUMN [email] NVARCHAR(50);

-- Contact us
ALTER TABLE [contact_us] ALTER COLUMN [message] NVARCHAR(500);
ALTER TABLE [contact_us_audit] ALTER COLUMN [message] NVARCHAR(500);

-- Email template
ALTER TABLE [email_template] ALTER COLUMN [message] NVARCHAR(2000);
ALTER TABLE [email_template] ALTER COLUMN [subject] NVARCHAR(150);
ALTER TABLE [email_template_audit] ALTER COLUMN [message] NVARCHAR(2000);
ALTER TABLE [email_template_audit] ALTER COLUMN [subject] NVARCHAR(150);

-- Location
ALTER TABLE [location] DROP CONSTRAINT UNIQUE__LOCATION__Code;
ALTER TABLE [location] DROP CONSTRAINT UNIQUE__LOCATION__Name;

ALTER TABLE [location] ALTER COLUMN [code] NVARCHAR(50);
ALTER TABLE [location] ALTER COLUMN [name] NVARCHAR(200);
ALTER TABLE [location_audit] ALTER COLUMN [code] NVARCHAR(50);
ALTER TABLE [location_audit] ALTER COLUMN [name] NVARCHAR(200);

ALTER TABLE [location] ADD CONSTRAINT UNIQUE__LOCATION__Code unique (code);
ALTER TABLE [location] ADD CONSTRAINT UNIQUE__LOCATION__Name unique (name);

-- ICS User
ALTER TABLE [ics_user] ALTER COLUMN [email] NVARCHAR(50);
ALTER TABLE [ics_user] ALTER COLUMN [first_name] NVARCHAR(30);
ALTER TABLE [ics_user] ALTER COLUMN [last_name] NVARCHAR(30);
ALTER TABLE [ics_user_audit] ALTER COLUMN [email] NVARCHAR(50);
ALTER TABLE [ics_user_audit] ALTER COLUMN [first_name] NVARCHAR(30);
ALTER TABLE [ics_user_audit] ALTER COLUMN [last_name] NVARCHAR(30);

-- Program
ALTER TABLE [program] DROP CONSTRAINT UNIQUE__PROGRAM_Location__Name;

ALTER TABLE [program] ALTER COLUMN [name] NVARCHAR(100);
ALTER TABLE [program] ALTER COLUMN [venue] NVARCHAR(50);
ALTER TABLE [program_audit] ALTER COLUMN [name] NVARCHAR(100);
ALTER TABLE [program_audit] ALTER COLUMN [venue] NVARCHAR(50);

ALTER TABLE [program] ADD CONSTRAINT UNIQUE__PROGRAM_Location__Name unique (location_id, name);

-- Time slot
ALTER TABLE [time_slot] ALTER COLUMN [end_time_display] NVARCHAR(8);
ALTER TABLE [time_slot] ALTER COLUMN [start_time_display] NVARCHAR(8);
ALTER TABLE [time_slot_audit] ALTER COLUMN [end_time_display] NVARCHAR(8);
ALTER TABLE [time_slot_audit] ALTER COLUMN [start_time_display] NVARCHAR(8);

---

--MIS-655 - Make email optional
ALTER TABLE [program]
ADD [email_required] BIT;

ALTER TABLE [program_audit]
ADD [email_required] BIT;

ALTER TRIGGER [dbo].[TRG_program] ON [dbo].[program] FOR  UPDATE, DELETE
AS
  INSERT into program_audit (RecordHistoryDate, RecordId, location_id, name, venue, active, created_by, date_created, last_updated_by, last_updated, email_required)
    SELECT getdate(), D.* FROM DELETED D
GO

UPDATE [program]
SET [email_required] = 1;

UPDATE [program_audit]
SET [email_required] = 1;

ALTER TABLE [program]
ALTER COLUMN [email_required] BIT NOT NULL;

ALTER TABLE [program_audit]
ALTER COLUMN [email_required] BIT NOT NULL;
