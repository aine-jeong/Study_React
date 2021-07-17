package com.ain.todolist.service;

import java.util.List;

import org.springframework.data.domain.Sort;

import com.ain.todolist.domain.Todo;

public interface TodoService {
	
	//Sort를 파라미터로 가지며, Sort를 통해 Todo 목록을 정렬하여 가져온다.
	List<Todo> getTodos(Sort sort) throws Exception;
	
	void postTodo(Todo todo) throws Exception;
	
	void deleteTodo(Long Id) throws Exception;
	
	Todo findTodoById(Long Id) throws Exception;
}
