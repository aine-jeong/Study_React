package com.ain.todolist.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ain.todolist.domain.Todo;

/*
 * 스프링부트에서는 Entity의 기본적인 CRUD가 가능하도록 JpaRepository Interface를 제공한다.
 */
public interface TodoRepository extends JpaRepository<Todo, Long>{

}
