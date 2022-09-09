import { PlusOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Input, Tag, Tooltip } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';

class PropsType {
  value: Array<any> = []
  isEdit?: boolean = true
  tagsChange!: (tags: Array<string>) => void;
}

export const TagsInput = (prop: PropsType) => {
  // 默认值value，是否编辑模式，tags变化回调
  const { value, isEdit, tagsChange } = prop
  // 已经添加了的tags
  const [tags, setTags] = useState<string[]>(value||[]);
  // 点击添加最后加进来的一个输入框是否展示
  const [inputVisible, setInputVisible] = useState(false);
  // 正在输入的值
  const [inputValue, setInputValue] = useState('');
  // 编辑前面的input的索引值
  const [editInputIndex, setEditInputIndex] = useState(-1);
  // 编辑前面的input的内容
  const [editInputValue, setEditInputValue] = useState('');
  // isEdit && hoverIn的时候显示X，显示添加按钮，显示input输入框
  const [hoverIn, setHoverIn] = useState(false);
  // 最后一个添加的输入元素
  const inputRef = useRef<InputRef>(null);
  // 编辑前面的元素
  const editInputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [inputValue]);

  // 外部输入会变化，什么时候变化？内部向外传tagsChange 外部的值就变化了value——>循环进来看下
  useEffect(() => {
    if (value && JSON.stringify(value) !== JSON.stringify(tags)) handleTagsChange(value)
  }, [value]);

  const handleTagsChange = (tag:any)=>{
    setTags(tag);
    tagsChange(tag)
  }

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter(tag => tag !== removedTag);
    handleTagsChange(newTags);
  };

  // 点击了+号，显示最后追加的输入框
  const showInput = () => {
    setInputVisible(true);
  };

  // 显示最后追加的输入框值变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // 显示最后追加的输入框值确定
  const handleInputConfirm = () => {
    if (new RegExp(/^["%|=;<>:'\\]{1,}$/, "g").test(inputValue) || inputValue.length>32|| tags.length >= 5) return
    if (inputValue && tags.indexOf(inputValue) === -1) {
      handleTagsChange([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };

 // 编辑之前的输入框值变化
  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value);
  };

  // 编辑之前的输入框值确定
  const handleEditInputConfirm = () => {
    if (new RegExp(/^["%|=;<>:'\\]{1,}$/, "g").test(editInputValue) || editInputValue.length>32|| tags.length > 5) return
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    handleTagsChange(newTags);
    setEditInputIndex(-1);
    setInputValue('');
  };
 
  return (
    <>
      <div className={styles['tags']} onMouseEnter={() => setHoverIn(true)} onMouseLeave={() => setHoverIn(false)}>
        {tags.map((tag, index) => {
          if (editInputIndex === index) {
            // 之前的标签此刻正在编辑输入框
            return (
              <Input
                ref={editInputRef}
                key={tag}
                size="small"
                className={styles['tag-input']}
                value={editInputValue}
                onChange={handleEditInputChange}
                onBlur={handleEditInputConfirm}
                onPressEnter={handleEditInputConfirm}
              />
            );
          }

          const isLongTag: boolean = tag.length > 10;

          const tagElem = (
            <Tag
              className={styles['edit-tag']}
              key={tag}
              closable={isEdit && hoverIn}
              onClose={() => handleClose(tag)}
            >
              <span
                onDoubleClick={e => {
                  if (isEdit && hoverIn) {
                    setEditInputIndex(index);
                    setEditInputValue(tag);
                    e.preventDefault();
                  }
                }}
              >
                {isLongTag ? `${tag.slice(0, 10)}...` : tag}
              </span>
            </Tag>
          );
          // 之前的标签
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          );
        })}
        {/* 最后的添加框和点击后的最后追加的输入框 */}
        {inputVisible && (
          <Input
            ref={inputRef}
            type="text"
            size="small"
            className={styles['tag-input']}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputConfirm}
            onPressEnter={handleInputConfirm}
          />
        )}
        {!inputVisible && isEdit && hoverIn && (tags.length <5) &&(
          <Tag className={styles['site-tag-plus']} onClick={showInput}>
            <PlusOutlined />
          </Tag>
        )}
      </div>
      {<div style={{width:'100%',position:'absolute'}}>{
        (new RegExp(/^["%|=;<>:'\\]{1,}$/, "g").test(inputValue) || inputValue.length >32) && <span className='ant-form-item-explain-error'>
          {"标签少于5个，长度不超32，不包含特殊字符\"%|=;<>:'\\"}
        </span>}
      </div>}
    </>
  );
};