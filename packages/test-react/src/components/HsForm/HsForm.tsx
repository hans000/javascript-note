import React, { ReactNode, Component } from 'react';
import { Form, Row, Col, Select, Input } from 'antd'
import { FormComponentProps, WrappedFormUtils } from 'antd/lib/form/Form';

export type FormState = 'edit' | 'view' | 'add'

/**
 * 组件说明
 * onSubmit方法可以不用，直接使用ref
 * formState为add时，initValues会设置为{}，也就是说formState的优先级高
 */
const FormItem = Form.Item;
/**
 * @param { any } data 表单数据
 * @param { any } onSubmit 提交数据
 * @param { any } onDistory 组件销毁回调
 */
interface IProps extends FormComponentProps {
    data: IField[];
    onSubmit?: (form: WrappedFormUtils) => void; // 提交数据
    onDistory?: (isChange: boolean) => void; // 组件销毁前
    style?: React.CSSProperties; // 表单样式
    className?: string; // 表单类名
    initValues?: any; // 表单初始值
    formState?: FormState; // 表单样式
}
interface IStates {
    initValues: any;
}
export enum FormType {
    Select,
    DatePickers,
    MonthPickers,
    TextArea,
    HrTextArea,
    Upload,
    Password,
    FileUpload,
    TreeSelect,
    HrTreeSelect,
    Input,
    TextPreview,
    HrAddress,
    FormTable,
    HrEditTable,
}
/**
 * @param { string } key 提交表单字段，必选
 * @param { FormType } type 表单类型，默认Input
 * @param { string } label 表单描述，必选
 * @param { boolean } hidden 是否隐藏
 * @param { Function } render 自行构造渲染
 * @param { boolean } renderOnly 单独渲染
 * @param { object } formConfig 表单控件的配置
 * @param { object } validatorConfig validator配置
 * @param { object } decoratorConfig decorator配置
 * @param { boolean } only 独占一行，相当于span=24
 * @param { number } span，默认12
 * @param { boolean } showLine 是否展示分割线
 */
export interface IField {
    key: string;
    type?: FormType;
    hidden?: boolean;
    render?: (value: any, children?: ReactNode) => any;
    renderOnly?: boolean;
    config?: any;
    span?: number;
    only?: boolean;
    formConfig?: any;
    validatorConfig?: IFieldValidator;
    decoratorConfig?: IFieldDecorator;
    showLine?: boolean;
}
export interface IFieldDecorator {
    initialValue?: any;
    rules?: object[];
    validateTrigger?: string | string[];
    valuePropName?: string;
    validateFirst?: boolean;
    preserve?: boolean;
    trigger?: string;
    normalize?: (value: string, prevValue: any, allValues: any) => any;
    getValueFromEvent?: (...arg: any) => void;
    getValueProps?: (value: any) => any;
}
export interface IFieldValidator {
    colon?: boolean;
    extra?: string | ReactNode;
    hasFeedback?: boolean;
    help?: string | ReactNode;
    htmlFor?: string;
    label?: string | ReactNode;
    labelAlign?: "left" | "right";
    required?: boolean;
    validateStatus?: "success" | "warning" | "error" | "validating";
}
interface IConfig {
    formConfig?: any;
    validatorConfig?: IFieldValidator;
    decoratorConfig?: IFieldDecorator;
}
interface IFormItemConfig {
    [name: number]: IConfig
}
/**
 * 配置默认的控件属性
 */
const defaultFormItemConfig: IFormItemConfig = {
    [FormType.TextPreview]: {
        validatorConfig: {
            hasFeedback: false,
        },
        formConfig: {
            showLine: true,
        }
    },
    [FormType.HrAddress]: {
        validatorConfig: {
            hasFeedback: false,
        },
        formConfig: {
        }
    },
    [FormType.Select]: {
        formConfig: {
            placeholder: '请选择',
            notFoundContent: '暂无内容',
        }
    },
    [FormType.DatePickers]: {
        formConfig: {
            placeholder: '请选择',
        }
    },
    [FormType.MonthPickers]: {
        formConfig: {
            placeholder: '请选择',
        }
    },
    [FormType.Password]: {
        formConfig: {
            autoComplete: 'new-password',
        }
    },
    [FormType.TextArea]: {
        formConfig: {
            placeholder: '请输入',
        }
    },
    [FormType.HrTextArea]: {
        formConfig: {
            placeholder: '请输入',
            rows: 3,
        }
    },
    [FormType.Upload]: {
        validatorConfig: {
            hasFeedback: false
        }
    },
    [FormType.FileUpload]: {
        validatorConfig: {
            hasFeedback: false
        }
    },
    [FormType.TreeSelect]: {
        formConfig: {
            placeholder: '请选择',
            notFoundContent: '暂无内容',
            dropdownStyle: { maxHeight: 400, overflow: 'auto' },
        }
    },
    [FormType.HrTreeSelect]: {
        formConfig: {
            placeholder: '请选择',
            notFoundContent: '暂无内容',
            dropdownStyle: { maxHeight: 400, overflow: 'auto' },
        }
    },
    [FormType.Input]: {
        formConfig: {
            placeholder: '请输入',
        }
    },
    [FormType.FormTable]: {
        formConfig: {
        }
    },
    [FormType.HrEditTable]: {
    },
}
/**
 * @description 动态表单生成
 */
class HsForm extends Component<IProps, IStates> {
    private isChange: boolean = false;
    private prevValues: any = {};
    private static defaultField = { type: FormType.TextPreview, span: 12, }
    private static defalutValidator: IFieldValidator = {}
    private static defalutDecorator: IFieldDecorator = {}

    constructor(props: IProps) {
        super(props);
        this.state = {
            initValues: props.formState === 'add' ? {} : (props.initValues || {})
        }
    }
    public static getDerivedStateFromProps(props: IProps, state: IStates) {
        if (props.formState !== 'add' &&
            props.initValues !== null &&
            JSON.stringify(props.initValues) !== JSON.stringify(state.initValues)) {
            return {
                initValues: props.initValues || {}
            }
        }
        if (props.formState === 'add') {
            return {
                initValues: {}
            }
        }
        return null
    }
    private createItem(type: FormType, formConfig: any) {
        switch (type) {
            case FormType.Select:
                return <Select {...formConfig} />
            case FormType.Input:
                return <Input {...formConfig} />
        }
    }
    private createField = (field: IField) => {
        const {
            key,
            span,
            only,
            render,
            hidden,
            renderOnly,
            decoratorConfig } = Object.assign({}, HsForm.defaultField, field);
        if (hidden) {
            return null
        }
        if (render) {
            let initialValue: any = this.state.initValues[key];
            if (initialValue === undefined) {
                initialValue = decoratorConfig.initialValue
            }
            if (renderOnly) {
                return render(initialValue)
            } else {
                return (
                    <Col span={only ? 24 : span} key={key}>
                        {render(initialValue, this.createValidateItem.call(null, field))}
                    </Col>
                )
            }
        }
        return (
            <Col span={only ? 24 : span} key={key}>
                {this.createValidateItem(field)}
            </Col>
        )
    }
    private createValidateItem = (field: IField) => {
        const {
            key,
            type,
            formConfig,
            validatorConfig,
            decoratorConfig
        } = Object.assign({}, HsForm.defaultField, field);
        const initDecoratorConfig = { ...decoratorConfig, initialValue: this.state.initValues[key] === undefined ? decoratorConfig ? decoratorConfig.initialValue : undefined : this.state.initValues[key] }
        const { getFieldDecorator } = this.props.form;
        const mergeDecoratorConfig = Object.assign({}, HsForm.defalutDecorator, defaultFormItemConfig[type].decoratorConfig, initDecoratorConfig)

        const mergeFormConfig = Object.assign({}, defaultFormItemConfig[type].formConfig, formConfig)

        // 查看时修正disabled、placeholder属性
        if (this.props.formState === 'view') {
            mergeFormConfig.disabled = true;
            if (initDecoratorConfig.initialValue === undefined || initDecoratorConfig.initialValue === null) {
                mergeFormConfig.placeholder = undefined
            }
        }
        return (
            <FormItem className={field.only ? 'hr-item-only' : ''} {...Object.assign({}, HsForm.defalutValidator, defaultFormItemConfig[type].validatorConfig, validatorConfig)}>
                {
                    getFieldDecorator(key, mergeDecoratorConfig)(
                        this.createItem(type, mergeFormConfig)
                    )
                }
            </FormItem>
        )
    }
    /**
     * @description 提交
     * @param { callback } 回调
     */
    public onSubmit = (callback: any) => {
        if (callback) {
            callback.call(null, this.props.form);
        }
    }
    public componentDidMount() {
        this.savePrevValues();
    }
    public componentWillUnmount() {
        const { onDistory } = this.props;
        this.isChange = this.compare();
        if (onDistory) {
            onDistory.call(null, this.isChange);
        }
    }
    private savePrevValues() {
        const timer = setTimeout(() => {
            this.prevValues = this.props.form.getFieldsValue()
            clearTimeout(timer);
        }, 17)
    }
    public compare() {
        const newValue = this.props.form.getFieldsValue() as any;
        return !Object.keys(newValue).every((key: string) => newValue[key] === this.prevValues[key])
    }
    public render() {
        const { data, style, className, formState } = this.props;
        const cls = ['hs-form'];

        if (formState === 'view') {
            cls.push('view')
        }
        if (className) {
            cls.push(className)
        }
        return (
            <div style={style} className={cls.join(' ')}>
                <Form onSubmit={this.onSubmit}>
                    <Row>{data.map((el: IField) => this.createField(el))}</Row>
                </Form>
            </div >
        )
    }
}

export default Form.create<IProps>({})(HsForm)