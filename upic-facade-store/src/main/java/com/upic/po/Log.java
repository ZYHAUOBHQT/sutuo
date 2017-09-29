package com.upic.po;

import com.upic.common.entity.BaseEntity;

public class Log extends BaseEntity {
	private static final long serialVersionUID = 1L;
	/** 文本 **/
	private String content;
	/** 店铺ID **/
	private Integer storeId;
	/** 编号 **/
	private String logNumber;
	/**标题**/
	private String title;
	/** pic **/
	private String pic;
	/**题目**/
	private String articName;
	/** 添加字段1 **/
	private String field1;
	/** 添加字段2 **/
	private String field2;
	/** 添加字段3 **/
	private String field3;
	/** 添加字段4 **/
	private String field4;
	/** 添加字段5 **/
	private String field5;

	public Log() {
		super();
	}

	public Log(String content, Integer storeId, String field1, String field2, String field3, String field4,
			String field5) {
		super();
		this.content = content;
		this.storeId = storeId;
		this.field1 = field1;
		this.field2 = field2;
		this.field3 = field3;
		this.field4 = field4;
		this.field5 = field5;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Integer getStoreId() {
		return storeId;
	}

	public void setStoreId(Integer storeId) {
		this.storeId = storeId;
	}

	public String getField1() {
		return field1;
	}

	public void setField1(String field1) {
		this.field1 = field1;
	}

	public String getField2() {
		return field2;
	}

	public void setField2(String field2) {
		this.field2 = field2;
	}

	public String getField3() {
		return field3;
	}

	public void setField3(String field3) {
		this.field3 = field3;
	}

	public String getField4() {
		return field4;
	}

	public void setField4(String field4) {
		this.field4 = field4;
	}

	public String getField5() {
		return field5;
	}

	public void setField5(String field5) {
		this.field5 = field5;
	}

	public String getPic() {
		return pic;
	}

	public void setPic(String pic) {
		this.pic = pic;
	}

	public String getLogNumber() {
		return logNumber;
	}

	public void setLogNumber(String logNumber) {
		this.logNumber = logNumber;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getArticName() {
		return articName;
	}

	public void setArticName(String articName) {
		this.articName = articName;
	}
}