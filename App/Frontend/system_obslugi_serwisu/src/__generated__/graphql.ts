/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: { input: any; output: any; }
};

export type AddReviewRequestInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  rating: Scalars['Int']['input'];
  repairShopId: Scalars['String']['input'];
};

export type AddressDto = {
  __typename?: 'AddressDto';
  apartmentNumber?: Maybe<Scalars['String']['output']>;
  buildingNumber: Scalars['String']['output'];
  city: Scalars['String']['output'];
  country: Country;
  postalCode: Scalars['String']['output'];
  recipientName: Scalars['String']['output'];
  street: Scalars['String']['output'];
};

export type AddressInput = {
  apartmentNumber?: InputMaybe<Scalars['String']['input']>;
  buildingNumber: Scalars['String']['input'];
  city: Scalars['String']['input'];
  country: Country;
  postalCode: Scalars['String']['input'];
  recipientName: Scalars['String']['input'];
  street: Scalars['String']['input'];
};

/** Defines when a policy shall be executed. */
export enum ApplyPolicy {
  /** After the resolver was executed. */
  AfterResolver = 'AFTER_RESOLVER',
  /** Before the resolver was executed. */
  BeforeResolver = 'BEFORE_RESOLVER',
  /** The policy is applied in the validation step before the execution. */
  Validation = 'VALIDATION'
}

export type BookRepairRequestInput = {
  contactInfo: ContactInfoInput;
  deviceInfo: DeviceInfoInput;
  faultInfo: FaultInfoInput;
  repairShopId: Scalars['String']['input'];
  returnInfo: ReturnInfoInput;
};

export type ContactInfoDto = {
  __typename?: 'ContactInfoDto';
  email: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
  preferredContactMethod: ContactMethod;
};

export type ContactInfoInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  phoneNumber: Scalars['String']['input'];
  phoneRegionCode: Scalars['String']['input'];
  preferredContactMethod: ContactMethod;
};

export enum ContactMethod {
  App = 'APP',
  PhoneCall = 'PHONE_CALL',
  Sms = 'SMS'
}

export enum Country {
  Poland = 'POLAND'
}

export type CustomerDto = {
  __typename?: 'CustomerDto';
  address?: Maybe<AddressDto>;
  email: Scalars['String']['output'];
  isBusiness: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  phoneRegionCode?: Maybe<Scalars['String']['output']>;
  preferredContactMethod?: Maybe<ContactMethod>;
  preferredReturnMethod?: Maybe<ReturnMethod>;
};

export type DeleteReviewRequestInput = {
  repairShopId: Scalars['String']['input'];
  reviewId: Scalars['String']['input'];
};

export type DeviceInfoDto = {
  __typename?: 'DeviceInfoDto';
  deviceType: DeviceType;
  manufacturer: Scalars['String']['output'];
  model: Scalars['String']['output'];
  serialNumber: Scalars['String']['output'];
};

export type DeviceInfoInput = {
  deviceType: DeviceType;
  manufacturer: Scalars['String']['input'];
  model: Scalars['String']['input'];
  serialNumber: Scalars['String']['input'];
};

export enum DeviceType {
  Camera = 'CAMERA',
  Desktop = 'DESKTOP',
  Drone = 'DRONE',
  GamingConsole = 'GAMING_CONSOLE',
  Headphones = 'HEADPHONES',
  Laptop = 'LAPTOP',
  Monitor = 'MONITOR',
  NetworkDevice = 'NETWORK_DEVICE',
  Other = 'OTHER',
  Printer = 'PRINTER',
  Scanner = 'SCANNER',
  Smartphone = 'SMARTPHONE',
  Smartwatch = 'SMARTWATCH',
  SmartHomeDevice = 'SMART_HOME_DEVICE',
  Speaker = 'SPEAKER',
  Tablet = 'TABLET',
  Television = 'TELEVISION',
  Wearable = 'WEARABLE'
}

export type FaultInfoDto = {
  __typename?: 'FaultInfoDto';
  description: Scalars['String']['output'];
  howToReproduce: Scalars['String']['output'];
  previouslyRepaired: Scalars['Boolean']['output'];
  whenOccured: Scalars['String']['output'];
};

export type FaultInfoInput = {
  description: Scalars['String']['input'];
  howToReproduce: Scalars['String']['input'];
  previouslyRepaired: Scalars['Boolean']['input'];
  whenOccured: Scalars['String']['input'];
};

export type GetRepairRequestInput = {
  repairId: Scalars['String']['input'];
};

export type GetRepairShopRequestInput = {
  id: Scalars['String']['input'];
};

export type GetReviewsRequestInput = {
  pageNumber: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  repairShopId: Scalars['String']['input'];
};

export type GetServicesRequestInput = {
  pageNumber: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  repairShopId: Scalars['String']['input'];
};

export type LoginRequestInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  rememberMe: Scalars['Boolean']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addReview: Scalars['Boolean']['output'];
  bookRepair: RepairDto;
  deleteReview: Scalars['Boolean']['output'];
  login: Scalars['Boolean']['output'];
  logout: Scalars['Boolean']['output'];
  register: Scalars['Boolean']['output'];
};


export type MutationAddReviewArgs = {
  request: AddReviewRequestInput;
};


export type MutationBookRepairArgs = {
  request: BookRepairRequestInput;
};


export type MutationDeleteReviewArgs = {
  request: DeleteReviewRequestInput;
};


export type MutationLoginArgs = {
  request: LoginRequestInput;
};


export type MutationRegisterArgs = {
  request: RegisterRequestInput;
};

export type OpeningHoursDto = {
  __typename?: 'OpeningHoursDto';
  friday?: Maybe<TimeIntervalDto>;
  monday?: Maybe<TimeIntervalDto>;
  saturday?: Maybe<TimeIntervalDto>;
  sunday?: Maybe<TimeIntervalDto>;
  thursday?: Maybe<TimeIntervalDto>;
  tuesday?: Maybe<TimeIntervalDto>;
  wednesday?: Maybe<TimeIntervalDto>;
};

export type PaginatedListOfRepairShopDto = {
  __typename?: 'PaginatedListOfRepairShopDto';
  items: Array<RepairShopDto>;
  pageNumber: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PaginatedListOfReviewDto = {
  __typename?: 'PaginatedListOfReviewDto';
  items: Array<ReviewDto>;
  pageNumber: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PaginatedListOfServiceDto = {
  __typename?: 'PaginatedListOfServiceDto';
  items: Array<ServiceDto>;
  pageNumber: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  me: CustomerDto;
  repair: RepairDto;
  repairShop: RepairShopDto;
  reviews: PaginatedListOfReviewDto;
  searchShopsByName: PaginatedListOfRepairShopDto;
  services: PaginatedListOfServiceDto;
};


export type QueryRepairArgs = {
  request: GetRepairRequestInput;
};


export type QueryRepairShopArgs = {
  request: GetRepairShopRequestInput;
};


export type QueryReviewsArgs = {
  request: GetReviewsRequestInput;
};


export type QuerySearchShopsByNameArgs = {
  request: SearchByNameRequestInput;
};


export type QueryServicesArgs = {
  request: GetServicesRequestInput;
};

export type RegisterRequestInput = {
  companyName?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  firstName?: InputMaybe<Scalars['String']['input']>;
  isBusiness: Scalars['Boolean']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  taxIdNumber?: InputMaybe<Scalars['String']['input']>;
};

export type RepairDto = {
  __typename?: 'RepairDto';
  contactInfo: ContactInfoDto;
  createdAt: Scalars['DateTime']['output'];
  deviceInfo: DeviceInfoDto;
  faultInfo: FaultInfoDto;
  id: Scalars['String']['output'];
  repairShopId: Scalars['String']['output'];
  returnInfo: ReturnInfoDto;
  status: RepairStatus;
};

export type RepairShopDto = {
  __typename?: 'RepairShopDto';
  aboutUs?: Maybe<Scalars['String']['output']>;
  address: AddressDto;
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  openingHours: OpeningHoursDto;
  phone: Scalars['String']['output'];
  rating: Scalars['Float']['output'];
  reviewCount: Scalars['Int']['output'];
  timeZoneId: Scalars['String']['output'];
};

export enum RepairStatus {
  AwaitingConfirmation = 'AWAITING_CONFIRMATION',
  AwaitingParts = 'AWAITING_PARTS',
  Booked = 'BOOKED',
  Canceled = 'CANCELED',
  Complaint = 'COMPLAINT',
  Completed = 'COMPLETED',
  InRepair = 'IN_REPAIR',
  PaymentRequired = 'PAYMENT_REQUIRED',
  ReadyForPickup = 'READY_FOR_PICKUP',
  ReadyToRepair = 'READY_TO_REPAIR',
  SentOut = 'SENT_OUT',
  ToBeDiagnosed = 'TO_BE_DIAGNOSED',
  ToBeSentOut = 'TO_BE_SENT_OUT'
}

export type ReturnInfoDto = {
  __typename?: 'ReturnInfoDto';
  returnAddress?: Maybe<AddressDto>;
  returnMethod: ReturnMethod;
};

export type ReturnInfoInput = {
  address?: InputMaybe<AddressInput>;
  returnMethod: ReturnMethod;
};

export enum ReturnMethod {
  CourierDelivery = 'COURIER_DELIVERY',
  SelfPickup = 'SELF_PICKUP'
}

export type ReviewDto = {
  __typename?: 'ReviewDto';
  authorName: Scalars['String']['output'];
  comment?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  rating: Scalars['Int']['output'];
};

export type SearchByNameRequestInput = {
  name: Scalars['String']['input'];
  pageNumber: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
};

export type ServiceDto = {
  __typename?: 'ServiceDto';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  price: Scalars['String']['output'];
};

export type TimeIntervalDto = {
  __typename?: 'TimeIntervalDto';
  from: Scalars['String']['output'];
  to: Scalars['String']['output'];
};

export type AddReviewMutationVariables = Exact<{
  repairShopId: Scalars['String']['input'];
  rating: Scalars['Int']['input'];
  comment?: InputMaybe<Scalars['String']['input']>;
}>;


export type AddReviewMutation = { __typename?: 'Mutation', addReview: boolean };

export type AuthContextQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthContextQuery = { __typename?: 'Query', me: { __typename?: 'CustomerDto', email: string, name: string, phone?: string | null, phoneRegionCode?: string | null, preferredContactMethod?: ContactMethod | null, preferredReturnMethod?: ReturnMethod | null, isBusiness: boolean, address?: { __typename?: 'AddressDto', recipientName: string, street: string, buildingNumber: string, apartmentNumber?: string | null, postalCode: string, city: string, country: Country } | null } };

export type BookRepairMutationVariables = Exact<{
  request: BookRepairRequestInput;
}>;


export type BookRepairMutation = { __typename?: 'Mutation', bookRepair: { __typename?: 'RepairDto', id: string, repairShopId: string, createdAt: any } };

export type GetRepairShopQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetRepairShopQuery = { __typename?: 'Query', repairShop: { __typename?: 'RepairShopDto', id: string, name: string, email: string, phone: string, timeZoneId: string, rating: number, reviewCount: number, aboutUs?: string | null, address: { __typename?: 'AddressDto', street: string, buildingNumber: string, apartmentNumber?: string | null, postalCode: string, city: string }, openingHours: { __typename?: 'OpeningHoursDto', monday?: { __typename?: 'TimeIntervalDto', from: string, to: string } | null, tuesday?: { __typename?: 'TimeIntervalDto', from: string, to: string } | null, wednesday?: { __typename?: 'TimeIntervalDto', from: string, to: string } | null, thursday?: { __typename?: 'TimeIntervalDto', from: string, to: string } | null, friday?: { __typename?: 'TimeIntervalDto', from: string, to: string } | null, saturday?: { __typename?: 'TimeIntervalDto', from: string, to: string } | null, sunday?: { __typename?: 'TimeIntervalDto', from: string, to: string } | null } } };

export type ReviewsQueryVariables = Exact<{
  repairShopId: Scalars['String']['input'];
  pageNumber: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
}>;


export type ReviewsQuery = { __typename?: 'Query', reviews: { __typename?: 'PaginatedListOfReviewDto', pageNumber: number, totalCount: number, totalPages: number, items: Array<{ __typename?: 'ReviewDto', id: string, authorName: string, rating: number, comment?: string | null }> } };

export type ServicesQueryVariables = Exact<{
  repairShopId: Scalars['String']['input'];
  pageNumber: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
}>;


export type ServicesQuery = { __typename?: 'Query', services: { __typename?: 'PaginatedListOfServiceDto', pageNumber: number, totalCount: number, totalPages: number, items: Array<{ __typename?: 'ServiceDto', name: string, price: string }> } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: boolean };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  isBusiness: Scalars['Boolean']['input'];
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  companyName?: InputMaybe<Scalars['String']['input']>;
  taxIdNumber?: InputMaybe<Scalars['String']['input']>;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: boolean };

export type SearchQueryVariables = Exact<{
  name: Scalars['String']['input'];
  pageNumber: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
}>;


export type SearchQuery = { __typename?: 'Query', searchShopsByName: { __typename?: 'PaginatedListOfRepairShopDto', pageNumber: number, totalCount: number, totalPages: number, items: Array<{ __typename?: 'RepairShopDto', id: string, name: string, timeZoneId: string, rating: number, reviewCount: number, address: { __typename?: 'AddressDto', street: string, buildingNumber: string, apartmentNumber?: string | null, postalCode: string, city: string }, openingHours: { __typename?: 'OpeningHoursDto', monday?: { __typename?: 'TimeIntervalDto', from: string, to: string } | null, tuesday?: { __typename?: 'TimeIntervalDto', from: string, to: string } | null, wednesday?: { __typename?: 'TimeIntervalDto', from: string, to: string } | null, thursday?: { __typename?: 'TimeIntervalDto', from: string, to: string } | null, friday?: { __typename?: 'TimeIntervalDto', from: string, to: string } | null, saturday?: { __typename?: 'TimeIntervalDto', from: string, to: string } | null, sunday?: { __typename?: 'TimeIntervalDto', from: string, to: string } | null } }> } };


export const AddReviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddReview"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repairShopId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"rating"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"comment"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addReview"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"repairShopId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairShopId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"rating"},"value":{"kind":"Variable","name":{"kind":"Name","value":"rating"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"comment"},"value":{"kind":"Variable","name":{"kind":"Name","value":"comment"}}}]}}]}]}}]} as unknown as DocumentNode<AddReviewMutation, AddReviewMutationVariables>;
export const AuthContextDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AuthContext"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"phoneRegionCode"}},{"kind":"Field","name":{"kind":"Name","value":"preferredContactMethod"}},{"kind":"Field","name":{"kind":"Name","value":"preferredReturnMethod"}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipientName"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"buildingNumber"}},{"kind":"Field","name":{"kind":"Name","value":"apartmentNumber"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isBusiness"}}]}}]}}]} as unknown as DocumentNode<AuthContextQuery, AuthContextQueryVariables>;
export const BookRepairDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"BookRepair"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BookRepairRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookRepair"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"repairShopId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<BookRepairMutation, BookRepairMutationVariables>;
export const GetRepairShopDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRepairShop"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repairShop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"timeZoneId"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"reviewCount"}},{"kind":"Field","name":{"kind":"Name","value":"aboutUs"}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"buildingNumber"}},{"kind":"Field","name":{"kind":"Name","value":"apartmentNumber"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"city"}}]}},{"kind":"Field","name":{"kind":"Name","value":"openingHours"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"monday"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tuesday"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wednesday"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}}]}},{"kind":"Field","name":{"kind":"Name","value":"thursday"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}}]}},{"kind":"Field","name":{"kind":"Name","value":"friday"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}}]}},{"kind":"Field","name":{"kind":"Name","value":"saturday"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sunday"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetRepairShopQuery, GetRepairShopQueryVariables>;
export const ReviewsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Reviews"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repairShopId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reviews"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"repairShopId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairShopId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"pageNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"authorName"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageNumber"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]} as unknown as DocumentNode<ReviewsQuery, ReviewsQueryVariables>;
export const ServicesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Services"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repairShopId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"services"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"repairShopId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairShopId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"pageNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageNumber"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]} as unknown as DocumentNode<ServicesQuery, ServicesQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"rememberMe"},"value":{"kind":"BooleanValue","value":true}}]}}]}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isBusiness"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taxIdNumber"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"isBusiness"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isBusiness"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"firstName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"lastName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"companyName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyName"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"taxIdNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taxIdNumber"}}}]}}]}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const SearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Search"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchShopsByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"pageNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"timeZoneId"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"reviewCount"}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"buildingNumber"}},{"kind":"Field","name":{"kind":"Name","value":"apartmentNumber"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"city"}}]}},{"kind":"Field","name":{"kind":"Name","value":"openingHours"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"monday"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tuesday"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wednesday"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}}]}},{"kind":"Field","name":{"kind":"Name","value":"thursday"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}}]}},{"kind":"Field","name":{"kind":"Name","value":"friday"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}}]}},{"kind":"Field","name":{"kind":"Name","value":"saturday"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sunday"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageNumber"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]} as unknown as DocumentNode<SearchQuery, SearchQueryVariables>;