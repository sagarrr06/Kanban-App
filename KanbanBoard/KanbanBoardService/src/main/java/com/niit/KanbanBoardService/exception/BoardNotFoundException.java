package com.niit.KanbanBoardService.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND,reason = "board not found in userDB")
public class BoardNotFoundException extends Exception{
}
