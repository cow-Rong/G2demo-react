import { Tag } from 'antd';
import React, { useState } from 'react';

const { CheckableTag } = Tag;

export interface Props {

    selectChange: (value: any) => any
    onChange?(value?: moment.Moment, inputValue?: string): void

    onOpenChange?(status?: boolean): void

    disabledDate?(currentDate: moment.Moment, inputValue: string): boolean

    allowClear?: boolean
    disabled?: boolean
    open?: boolean
    placeholder?: string
    propsformat?: string
    className?: string
    propsvalue?: moment.Moment
    defaultValue?: moment.Moment
    label: string,
    data:{
        tagsData:Array<any>
    }
}

export const SelectTagRow = (prop: Props) => {
    const {data,selectChange}=prop;
    console.log(data)
    const [selectedTagslabel, setSelectedTagsLabel] = useState<string[]>([]);
    const [selectedTagsvalue, setSelectedTagsValue] = useState<string[]>([]);

    const handleChange = (tag: any, checked: boolean) => {
        const nextSelectedTagsLabel = checked ? [...selectedTagslabel, tag.label] : selectedTagslabel.filter(t => t !== tag.label);
        setSelectedTagsLabel(nextSelectedTagsLabel);
        const nextSelectedTagsValue = checked ? [...selectedTagsvalue, tag.value] : selectedTagsvalue.filter(t => t !== tag.value);
        setSelectedTagsValue(nextSelectedTagsValue);
        selectChange(nextSelectedTagsValue)
    };

    return (
        <div>
            <span style={{ marginRight: 8 }}>{prop.label}</span>
            {data.tagsData.map(tag => (
                <CheckableTag style={{boxShadow: 'inset 0px 22px rgb(0 0 0 / 4%)'}}
                    key={tag.value}
                    checked={selectedTagslabel.indexOf(tag.label) > -1}
                    onChange={checked => handleChange(tag, checked)}
                >
                    {tag.label}
                </CheckableTag>
            ))}
        </div>
    )
}