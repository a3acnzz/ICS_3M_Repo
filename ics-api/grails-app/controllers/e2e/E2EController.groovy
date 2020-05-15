package e2e

class E2EController {
	static responseFormats = ['json']

    E2EService e2EService

    def prepareLocationAnnouncement() {
        respond e2EService.prepareLocationAnnouncement()
    }

    def cleanupLocationAnnouncement() {
        respond e2EService.cleanupLocationAnnouncement()
    }

    def prepareLocationBccEmails() {
        respond e2EService.prepareLocationBccEmails()
    }

    def cleanupLocationBccEmails() {
        respond e2EService.cleanupLocationBccEmails()
    }

    def prepareLocationContactUs() {
        respond e2EService.prepareLocationContactUs()
    }

    def cleanupLocationContactUs() {
        respond e2EService.cleanupLocationContactUs()
    }

    def prepareSystemBccEmails() {
        respond e2EService.prepareSystemBccEmails()
    }

    def cleanupSystemBccEmails() {
        respond e2EService.cleanupSystemBccEmails()
    }

    def prepareEmailTemplates() {
        respond e2EService.prepareEmailTemplates()
    }

    def cleanupEmailTemplates() {
        respond e2EService.cleanupEmailTemplates()
    }

    def prepareAdminManageAdmin() {
        respond e2EService.prepareAdminManageAdmin()
    }

    def cleanupAdminManageAdmin() {
        respond e2EService.cleanupAdminManageAdmin()
    }

    def cleanupAdminLocation() {
        respond e2EService.cleanupAdminLocation()
    }

    def prepareProgramOwnerLocation () {
        respond e2EService.prepareProgramOwnerLocation()
    }

    def cleanupProgramOwnerLocation () {
        respond e2EService.cleanupProgramOwnerLocation()
    }

    def prepareSignUpNoProgram () {
        respond e2EService.prepareSignUpNoProgram()
    }

    def cleanupSignUpNoProgram () {
        respond e2EService.cleanupSignUpNoProgram()
    }

    def prepareSignUpNoProgramDates () {
        respond e2EService.prepareSignUpNoProgramDates()
    }

    def cleanupSignUpNoProgramDates () {
        respond e2EService.cleanupSignUpNoProgramDates()
    }

    def prepareSignUpPastProgramDates () {
        respond e2EService.prepareSignUpPastProgramDates()
    }

    def cleanupSignUpPastProgramDates () {
        respond e2EService.cleanupSignUpPastProgramDates()
    }

    def prepareSignUpNoTimeSlots () {
        respond e2EService.prepareSignUpNoTimeSlots()
    }

    def cleanupSignUpNoTimeSlots () {
        respond e2EService.cleanupSignUpNoTimeSlots()
    }

    def prepareSignUpProgram () {
        respond e2EService.prepareSignUpProgram()
    }

    def cleanupSignUpProgram () {
        respond e2EService.cleanupSignUpProgram()
    }

    def prepareManagePendingAppointment () {
        respond e2EService.prepareManagePendingAppointment()
    }

    def cleanupManagePendingAppointment () {
        respond e2EService.cleanupManagePendingAppointment()
    }

    def prepareProgramAppointments () {
        respond e2EService.prepareProgramAppointments()
    }

    def cleanupProgramAppointments () {
        respond e2EService.cleanupProgramAppointments()
    }

    def prepareSignUpEmailOptional () {
        respond e2EService.prepareSignUpEmailOptional()
    }

    def cleanupSignUpEmailOptional () {
        respond e2EService.cleanupSignUpEmailOptional()
    }
}
