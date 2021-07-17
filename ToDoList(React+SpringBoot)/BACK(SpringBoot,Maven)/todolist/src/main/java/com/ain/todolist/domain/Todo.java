package com.ain.todolist.domain;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity //Entity클래스임을 지정하며 테이블과 매핑된다
@Table //별도의 이름을 갖는 데이터베이스 테이블과 매핑된다.
// 기본적으로 Entity 어노테이션으로 선언된 클래스의 이름은 실제 데이터베이스의 테이블 명과 일치하는 것을 매핑한다.
public class Todo implements Serializable {
	
	private static final long serialVersionUID = -947585423656694361L;
	
	@Id //primary key를 가지는 변수를 선언하는 것
	@Column //기본적으로 멤버 변수명과 일치하는 DB 컬럼을 매핑
	@GeneratedValue(strategy = GenerationType.IDENTITY) //기본키가 자동으로 할당되도록 설정하는 어노테이션
	private Long id;
	
	@Column
	private String content;
	
	@Column
	private LocalDateTime createdDateTime;
	
	@Column
	private Boolean isComplete;
	
	@Builder
    public Todo(Long id, String content, LocalDateTime createdDateTime, Boolean isComplete) {
        this.id = id;
        this.content = content;
        this.createdDateTime = createdDateTime;
        this.isComplete = isComplete;
    }

	@Override
	public String toString() {
		return "Todo [id=" + id + ", content=" + content + ", createdDateTime=" + createdDateTime + ", isComplete="
				+ isComplete + "]";
	}
	
}
