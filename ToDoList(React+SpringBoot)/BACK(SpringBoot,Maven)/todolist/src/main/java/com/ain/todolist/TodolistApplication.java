package com.ain.todolist;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
 
@SpringBootApplication
public class TodolistApplication {
 
    public static void main(String[] args) {
        SpringApplication.run(TodolistApplication.class, args);
    }
    
    //서버 테스트 데이터 생성을 위해 사용한 인터페이스 삭제하기
//    @Bean
//    public CommandLineRunner runner(TodoRepository todoRepository) throws Exception {
//        //자바 8 람다 표현식
//    	return (args) -> {
//            IntStream.rangeClosed(1, 10).forEach(index -> todoRepository.save(Todo.builder()
//                    .content("오늘 할 일" + index)
//                    .createdDateTime(LocalDateTime.now())
//                    .isComplete(false)
//                    .build())
//            );
//        };
//    }
}