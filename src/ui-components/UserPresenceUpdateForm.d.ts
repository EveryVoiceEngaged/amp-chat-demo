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
export declare type UserPresenceUpdateFormInputValues = {
    email?: string;
    status?: string;
    lastActiveTimestamp?: string;
};
export declare type UserPresenceUpdateFormValidationValues = {
    email?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
    lastActiveTimestamp?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserPresenceUpdateFormOverridesProps = {
    UserPresenceUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
    lastActiveTimestamp?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UserPresenceUpdateFormProps = React.PropsWithChildren<{
    overrides?: UserPresenceUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    userPresence?: any;
    onSubmit?: (fields: UserPresenceUpdateFormInputValues) => UserPresenceUpdateFormInputValues;
    onSuccess?: (fields: UserPresenceUpdateFormInputValues) => void;
    onError?: (fields: UserPresenceUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserPresenceUpdateFormInputValues) => UserPresenceUpdateFormInputValues;
    onValidate?: UserPresenceUpdateFormValidationValues;
} & React.CSSProperties>;
export default function UserPresenceUpdateForm(props: UserPresenceUpdateFormProps): React.ReactElement;
