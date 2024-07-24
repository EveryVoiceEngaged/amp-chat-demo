/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getChat } from "../graphql/queries";
import { updateChat } from "../graphql/mutations";
const client = generateClient();
export default function ChatUpdateForm(props) {
  const {
    id: idProp,
    chat: chatModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    message: "",
    email: "",
    timestamp: "",
    isPublic: false,
    recipient: "",
    attachment: "",
    attachmentType: "",
    avatar: "",
  };
  const [message, setMessage] = React.useState(initialValues.message);
  const [email, setEmail] = React.useState(initialValues.email);
  const [timestamp, setTimestamp] = React.useState(initialValues.timestamp);
  const [isPublic, setIsPublic] = React.useState(initialValues.isPublic);
  const [recipient, setRecipient] = React.useState(initialValues.recipient);
  const [attachment, setAttachment] = React.useState(initialValues.attachment);
  const [attachmentType, setAttachmentType] = React.useState(
    initialValues.attachmentType
  );
  const [avatar, setAvatar] = React.useState(initialValues.avatar);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = chatRecord
      ? { ...initialValues, ...chatRecord }
      : initialValues;
    setMessage(cleanValues.message);
    setEmail(cleanValues.email);
    setTimestamp(cleanValues.timestamp);
    setIsPublic(cleanValues.isPublic);
    setRecipient(cleanValues.recipient);
    setAttachment(cleanValues.attachment);
    setAttachmentType(cleanValues.attachmentType);
    setAvatar(cleanValues.avatar);
    setErrors({});
  };
  const [chatRecord, setChatRecord] = React.useState(chatModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getChat.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getChat
        : chatModelProp;
      setChatRecord(record);
    };
    queryData();
  }, [idProp, chatModelProp]);
  React.useEffect(resetStateValues, [chatRecord]);
  const validations = {
    message: [{ type: "Required" }],
    email: [{ type: "Required" }],
    timestamp: [{ type: "Required" }],
    isPublic: [{ type: "Required" }],
    recipient: [],
    attachment: [],
    attachmentType: [],
    avatar: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
      hourCycle: "h23",
    });
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          message,
          email,
          timestamp,
          isPublic,
          recipient: recipient ?? null,
          attachment: attachment ?? null,
          attachmentType: attachmentType ?? null,
          avatar: avatar ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateChat.replaceAll("__typename", ""),
            variables: {
              input: {
                id: chatRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "ChatUpdateForm")}
      {...rest}
    >
      <TextField
        label="Message"
        isRequired={true}
        isReadOnly={false}
        value={message}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              message: value,
              email,
              timestamp,
              isPublic,
              recipient,
              attachment,
              attachmentType,
              avatar,
            };
            const result = onChange(modelFields);
            value = result?.message ?? value;
          }
          if (errors.message?.hasError) {
            runValidationTasks("message", value);
          }
          setMessage(value);
        }}
        onBlur={() => runValidationTasks("message", message)}
        errorMessage={errors.message?.errorMessage}
        hasError={errors.message?.hasError}
        {...getOverrideProps(overrides, "message")}
      ></TextField>
      <TextField
        label="Email"
        isRequired={true}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              message,
              email: value,
              timestamp,
              isPublic,
              recipient,
              attachment,
              attachmentType,
              avatar,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <TextField
        label="Timestamp"
        isRequired={true}
        isReadOnly={false}
        type="datetime-local"
        value={timestamp && convertToLocal(new Date(timestamp))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              message,
              email,
              timestamp: value,
              isPublic,
              recipient,
              attachment,
              attachmentType,
              avatar,
            };
            const result = onChange(modelFields);
            value = result?.timestamp ?? value;
          }
          if (errors.timestamp?.hasError) {
            runValidationTasks("timestamp", value);
          }
          setTimestamp(value);
        }}
        onBlur={() => runValidationTasks("timestamp", timestamp)}
        errorMessage={errors.timestamp?.errorMessage}
        hasError={errors.timestamp?.hasError}
        {...getOverrideProps(overrides, "timestamp")}
      ></TextField>
      <SwitchField
        label="Is public"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isPublic}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              message,
              email,
              timestamp,
              isPublic: value,
              recipient,
              attachment,
              attachmentType,
              avatar,
            };
            const result = onChange(modelFields);
            value = result?.isPublic ?? value;
          }
          if (errors.isPublic?.hasError) {
            runValidationTasks("isPublic", value);
          }
          setIsPublic(value);
        }}
        onBlur={() => runValidationTasks("isPublic", isPublic)}
        errorMessage={errors.isPublic?.errorMessage}
        hasError={errors.isPublic?.hasError}
        {...getOverrideProps(overrides, "isPublic")}
      ></SwitchField>
      <TextField
        label="Recipient"
        isRequired={false}
        isReadOnly={false}
        value={recipient}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              message,
              email,
              timestamp,
              isPublic,
              recipient: value,
              attachment,
              attachmentType,
              avatar,
            };
            const result = onChange(modelFields);
            value = result?.recipient ?? value;
          }
          if (errors.recipient?.hasError) {
            runValidationTasks("recipient", value);
          }
          setRecipient(value);
        }}
        onBlur={() => runValidationTasks("recipient", recipient)}
        errorMessage={errors.recipient?.errorMessage}
        hasError={errors.recipient?.hasError}
        {...getOverrideProps(overrides, "recipient")}
      ></TextField>
      <TextField
        label="Attachment"
        isRequired={false}
        isReadOnly={false}
        value={attachment}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              message,
              email,
              timestamp,
              isPublic,
              recipient,
              attachment: value,
              attachmentType,
              avatar,
            };
            const result = onChange(modelFields);
            value = result?.attachment ?? value;
          }
          if (errors.attachment?.hasError) {
            runValidationTasks("attachment", value);
          }
          setAttachment(value);
        }}
        onBlur={() => runValidationTasks("attachment", attachment)}
        errorMessage={errors.attachment?.errorMessage}
        hasError={errors.attachment?.hasError}
        {...getOverrideProps(overrides, "attachment")}
      ></TextField>
      <TextField
        label="Attachment type"
        isRequired={false}
        isReadOnly={false}
        value={attachmentType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              message,
              email,
              timestamp,
              isPublic,
              recipient,
              attachment,
              attachmentType: value,
              avatar,
            };
            const result = onChange(modelFields);
            value = result?.attachmentType ?? value;
          }
          if (errors.attachmentType?.hasError) {
            runValidationTasks("attachmentType", value);
          }
          setAttachmentType(value);
        }}
        onBlur={() => runValidationTasks("attachmentType", attachmentType)}
        errorMessage={errors.attachmentType?.errorMessage}
        hasError={errors.attachmentType?.hasError}
        {...getOverrideProps(overrides, "attachmentType")}
      ></TextField>
      <TextField
        label="Avatar"
        isRequired={false}
        isReadOnly={false}
        value={avatar}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              message,
              email,
              timestamp,
              isPublic,
              recipient,
              attachment,
              attachmentType,
              avatar: value,
            };
            const result = onChange(modelFields);
            value = result?.avatar ?? value;
          }
          if (errors.avatar?.hasError) {
            runValidationTasks("avatar", value);
          }
          setAvatar(value);
        }}
        onBlur={() => runValidationTasks("avatar", avatar)}
        errorMessage={errors.avatar?.errorMessage}
        hasError={errors.avatar?.hasError}
        {...getOverrideProps(overrides, "avatar")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || chatModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || chatModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
