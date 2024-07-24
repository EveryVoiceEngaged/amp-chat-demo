/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ChatUpdateFormInputValues = {
    message?: string;
    email?: string;
    timestamp?: string;
    isPublic?: boolean;
    recipient?: string;
    attachment?: string;
    attachmentType?: string;
    avatar?: string;
};
export declare type ChatUpdateFormValidationValues = {
    message?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    timestamp?: ValidationFunction<string>;
    isPublic?: ValidationFunction<boolean>;
    recipient?: ValidationFunction<string>;
    attachment?: ValidationFunction<string>;
    attachmentType?: ValidationFunction<string>;
    avatar?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ChatUpdateFormOverridesProps = {
    ChatUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    message?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    timestamp?: PrimitiveOverrideProps<TextFieldProps>;
    isPublic?: PrimitiveOverrideProps<SwitchFieldProps>;
    recipient?: PrimitiveOverrideProps<TextFieldProps>;
    attachment?: PrimitiveOverrideProps<TextFieldProps>;
    attachmentType?: PrimitiveOverrideProps<TextFieldProps>;
    avatar?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ChatUpdateFormProps = React.PropsWithChildren<{
    overrides?: ChatUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    chat?: any;
    onSubmit?: (fields: ChatUpdateFormInputValues) => ChatUpdateFormInputValues;
    onSuccess?: (fields: ChatUpdateFormInputValues) => void;
    onError?: (fields: ChatUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ChatUpdateFormInputValues) => ChatUpdateFormInputValues;
    onValidate?: ChatUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ChatUpdateForm(props: ChatUpdateFormProps): React.ReactElement;
