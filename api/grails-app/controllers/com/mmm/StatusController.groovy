package com.mmm

class StatusController {
	static responseFormats = ['json']
	
    def index() {
        render(text: "{status:active}", contentType: "text/json", encoding: "UTF-8")
    }
}
