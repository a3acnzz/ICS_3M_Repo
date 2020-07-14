package com.mmm.erfe.service.impl;

/**
 * 
 * @author Senthil
 *
 */

/**
 * MsgServiceResponse
 * 
 * @author Senthil
 *
 */
public enum MsgServiceResponse {
	NO_USER_WITH_USERNAME("No such user in system."), FORBIDDEN_ACTION("The action is forbidden for current user"),
	TRANSACTION_PROBLEM("Transaction is failed."), UKNOWN_PROBLEM("Uknown problem"), OK("Well done"), ERROR("Error");

	/**
	 * msg-Variable of type String
	 * 
	 * @author Senthil
	 * @param void
	 * @throws Nothing
	 * @return void
	 * 
	 */
	private final String msg;

	/**
	 * set MsgServiceResponse
	 * 
	 * @author Senthil
	 * @param msg
	 * @throws Nothing
	 * @return void
	 */
	MsgServiceResponse(final String msg) {
		this.msg = msg;
	}

	/**
	 * toString
	 * 
	 * @author Senthil
	 * @param void
	 * @throws Nothing
	 * @return msg of type String
	 */
	@Override
	public String toString() {
		return msg;
	}
}
