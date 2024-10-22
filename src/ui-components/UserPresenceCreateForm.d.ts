/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type UserPresenceCreateFormInputValues = {
    email?: string;
    status?: string;
    lastActiveTimestamp?: string;
    avatar?: string;
};
export declare type UserPresenceCreateFormValidationValues = {
    email?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
    lastActiveTimestamp?: ValidationFunction<string>;
    avatar?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserPresenceCreateFormOverridesProps = {
    UserPresenceCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
    lastActiveTimestamp?: PrimitiveOverrideProps<TextFieldProps>;
    avatar?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UserPresenceCreateFormProps = React.PropsWithChildren<{
    overrides?: UserPresenceCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: UserPresenceCreateFormInputValues) => UserPresenceCreateFormInputValues;
    onSuccess?: (fields: UserPresenceCreateFormInputValues) => void;
    onError?: (fields: UserPresenceCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserPresenceCreateFormInputValues) => UserPresenceCreateFormInputValues;
    onValidate?: UserPresenceCreateFormValidationValues;
} & React.CSSProperties>;
export default function UserPresenceCreateForm(props: UserPresenceCreateFormProps): React.ReactElement;
