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
  /** The `Decimal` scalar type represents a decimal floating-point number. */
  Decimal: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

export enum ActingRole {
  Customer = 'CUSTOMER',
  Worker = 'WORKER'
}

export type AddReviewRequestInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  rating: Scalars['Int']['input'];
  repairShopId: Scalars['UUID']['input'];
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

export type ApproveQuoteRequestInput = {
  actingRole: ActingRole;
  repairId: Scalars['UUID']['input'];
};

export type BookRepairRequestInput = {
  additionalComment?: InputMaybe<Scalars['String']['input']>;
  contactInfo: ContactInfoInput;
  deviceInfo: DeviceInfoInput;
  faultInfo: FaultInfoInput;
  repairShopId: Scalars['String']['input'];
  returnInfo: ReturnInfoInput;
};

export type ChangeAddressRequestInput = {
  apartmentNumber?: InputMaybe<Scalars['String']['input']>;
  buildingNumber: Scalars['String']['input'];
  city: Scalars['String']['input'];
  country: Country;
  postalCode: Scalars['String']['input'];
  recipientName: Scalars['String']['input'];
  street: Scalars['String']['input'];
};

export type ChangeEmailRequestInput = {
  newEmail: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type ChangePasswordRequestInput = {
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};

export type ChangePhoneNumberRequestInput = {
  newPhoneNumber: Scalars['String']['input'];
  regionCode: Scalars['String']['input'];
};

export type CheckInAndQueueRequestInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  repairId: Scalars['UUID']['input'];
};

export type CompleteRepairFailureRequestInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  repairId: Scalars['UUID']['input'];
};

export type CompleteRepairSuccessRequestInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  finalCost?: InputMaybe<Scalars['Decimal']['input']>;
  finalCostCurrency?: InputMaybe<CurrencyCode>;
  repairId: Scalars['UUID']['input'];
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

export type ConversationDto = {
  __typename?: 'ConversationDto';
  conversationType: ConversationType;
  createdAt: Scalars['DateTime']['output'];
  customer?: Maybe<CustomerDto>;
  id: Scalars['UUID']['output'];
  messages: CursorPaginatedListOfMessageDtoAndNullableOfGuid;
  modifiedAt: Scalars['DateTime']['output'];
  repair?: Maybe<RepairDto>;
  repairShop?: Maybe<RepairShopDto>;
};


export type ConversationDtoMessagesArgs = {
  request: GetMessagesRequestInput;
};

export enum ConversationType {
  GeneralChat = 'GENERAL_CHAT',
  RepairChat = 'REPAIR_CHAT'
}

export enum Country {
  Poland = 'POLAND'
}

export type CreateConversationRequestInput = {
  firstMessage: Scalars['String']['input'];
  receiverId: Scalars['UUID']['input'];
};

export enum CurrencyCode {
  Pln = 'PLN',
  Usd = 'USD'
}

export type CursorPaginatedListOfConversationDtoAndNullableOfGuid = {
  __typename?: 'CursorPaginatedListOfConversationDtoAndNullableOfGuid';
  hasMore: Scalars['Boolean']['output'];
  items: Array<ConversationDto>;
  lastItemId?: Maybe<Scalars['UUID']['output']>;
};

export type CursorPaginatedListOfMessageDtoAndNullableOfGuid = {
  __typename?: 'CursorPaginatedListOfMessageDtoAndNullableOfGuid';
  hasMore: Scalars['Boolean']['output'];
  items: Array<MessageDto>;
  lastItemId?: Maybe<Scalars['UUID']['output']>;
};

export type CustomerDto = {
  __typename?: 'CustomerDto';
  id: Scalars['UUID']['output'];
  isBusiness: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
};

export type DeclareUnfixableRequestInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  repairId: Scalars['UUID']['input'];
};

export type DeleteReviewRequestInput = {
  repairShopId: Scalars['UUID']['input'];
  reviewId: Scalars['UUID']['input'];
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
  whenOccurred: Scalars['String']['output'];
};

export type FaultInfoInput = {
  description: Scalars['String']['input'];
  howToReproduce: Scalars['String']['input'];
  previouslyRepaired: Scalars['Boolean']['input'];
  whenOccurred: Scalars['String']['input'];
};

export type FinalizeDeliveryRequestInput = {
  actingRole: ActingRole;
  repairId: Scalars['UUID']['input'];
};

export type FullCustomerDto = {
  __typename?: 'FullCustomerDto';
  address?: Maybe<AddressDto>;
  conversations: CursorPaginatedListOfConversationDtoAndNullableOfGuid;
  email: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  isBusiness: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  phoneRegionCode?: Maybe<Scalars['String']['output']>;
  preferredContactMethod?: Maybe<ContactMethod>;
  preferredReturnMethod?: Maybe<ReturnMethod>;
  repairs: PaginatedListOfRepairDto;
};


export type FullCustomerDtoConversationsArgs = {
  request: GetConversationListRequestInput;
};


export type FullCustomerDtoRepairsArgs = {
  request: GetRepairListRequestInput;
};

export type FullWorkerDto = {
  __typename?: 'FullWorkerDto';
  activeRepair?: Maybe<RepairDto>;
  firstName: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  lastName: Scalars['String']['output'];
  repairShop?: Maybe<RepairShopDto>;
};

export type GetConversationByParticipantsRequestInput = {
  customerId: Scalars['UUID']['input'];
  repairShopId: Scalars['UUID']['input'];
};

export type GetConversationListRequestInput = {
  lastConversationId?: InputMaybe<Scalars['UUID']['input']>;
  numberOfConversations: Scalars['Int']['input'];
};

export type GetConversationRequestInput = {
  conversationId: Scalars['UUID']['input'];
};

export type GetMessagesRequestInput = {
  lastMessageId?: InputMaybe<Scalars['UUID']['input']>;
  numberOfMessages: Scalars['Int']['input'];
};

export type GetRepairListRequestInput = {
  pageNumber: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
};

export type GetRepairRequestInput = {
  repairId: Scalars['UUID']['input'];
};

export type GetRepairShopRequestInput = {
  repairShopId: Scalars['UUID']['input'];
};

export type GetReviewsRequestInput = {
  pageNumber: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  repairShopId: Scalars['UUID']['input'];
};

export type GetServicesRequestInput = {
  pageNumber: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  repairShopId: Scalars['UUID']['input'];
};

export type ImageDto = {
  __typename?: 'ImageDto';
  extraLarge: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  large: Scalars['String']['output'];
  medium: Scalars['String']['output'];
  small: Scalars['String']['output'];
};

export type LoginRequestInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  rememberMe: Scalars['Boolean']['input'];
};

export type MeResult = FullCustomerDto | FullWorkerDto;

export type MessageDto = {
  __typename?: 'MessageDto';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['UUID']['output'];
  senderRole: SenderRole;
};

export type Mutation = {
  __typename?: 'Mutation';
  addRepairImage: Scalars['String']['output'];
  addRepairShopImage: Scalars['String']['output'];
  addReview: Scalars['Boolean']['output'];
  assignWorker: Scalars['Boolean']['output'];
  bookRepair: RepairDto;
  changeAddress: Scalars['Boolean']['output'];
  changeEmail: Scalars['Boolean']['output'];
  changePassword: Scalars['Boolean']['output'];
  changePhoneNumber: Scalars['Boolean']['output'];
  changePreferredContact: Scalars['Boolean']['output'];
  changePreferredReturn: Scalars['Boolean']['output'];
  createConversation: ConversationDto;
  deleteReview: Scalars['Boolean']['output'];
  login: Scalars['Boolean']['output'];
  logout: Scalars['Boolean']['output'];
  register: Scalars['Boolean']['output'];
  removeAddress: Scalars['Boolean']['output'];
  removePhoneNumber: Scalars['Boolean']['output'];
  repairActions: RepairActions;
  sendMessage: Scalars['Boolean']['output'];
  unassignWorker: Scalars['Boolean']['output'];
};


export type MutationAddRepairImageArgs = {
  contentType: Scalars['String']['input'];
  repairId: Scalars['UUID']['input'];
};


export type MutationAddRepairShopImageArgs = {
  contentType: Scalars['String']['input'];
  imageType: RepairShopImageType;
  repairShopId: Scalars['UUID']['input'];
};


export type MutationAddReviewArgs = {
  request: AddReviewRequestInput;
};


export type MutationAssignWorkerArgs = {
  repairId: Scalars['UUID']['input'];
};


export type MutationBookRepairArgs = {
  request: BookRepairRequestInput;
};


export type MutationChangeAddressArgs = {
  request: ChangeAddressRequestInput;
};


export type MutationChangeEmailArgs = {
  request: ChangeEmailRequestInput;
};


export type MutationChangePasswordArgs = {
  request: ChangePasswordRequestInput;
};


export type MutationChangePhoneNumberArgs = {
  request: ChangePhoneNumberRequestInput;
};


export type MutationChangePreferredContactArgs = {
  contactMethod?: InputMaybe<ContactMethod>;
};


export type MutationChangePreferredReturnArgs = {
  returnMethod?: InputMaybe<ReturnMethod>;
};


export type MutationCreateConversationArgs = {
  request: CreateConversationRequestInput;
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


export type MutationSendMessageArgs = {
  request: SendMessageRequestInput;
};


export type MutationUnassignWorkerArgs = {
  repairId: Scalars['UUID']['input'];
};

export type NormalRepairStepDto = RepairStepDto & {
  __typename?: 'NormalRepairStepDto';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  status: RepairStatus;
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

export type PaginatedListOfRepairDto = {
  __typename?: 'PaginatedListOfRepairDto';
  items: Array<RepairDto>;
  pageNumber: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
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

export type PaymentRepairStepDto = RepairStepDto & {
  __typename?: 'PaymentRepairStepDto';
  amount: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  paid: Scalars['Boolean']['output'];
  status: RepairStatus;
};

export type Query = {
  __typename?: 'Query';
  conversation: ConversationDto;
  conversationByParticipants: ConversationDto;
  me: MeResult;
  repair: RepairDto;
  repairCount: Scalars['Int']['output'];
  repairShop: RepairShopDto;
  reviews: PaginatedListOfReviewDto;
  searchShopsByName: PaginatedListOfRepairShopDto;
  services: PaginatedListOfServiceDto;
};


export type QueryConversationArgs = {
  request: GetConversationRequestInput;
};


export type QueryConversationByParticipantsArgs = {
  request: GetConversationByParticipantsRequestInput;
};


export type QueryRepairArgs = {
  request: GetRepairRequestInput;
};


export type QueryRepairCountArgs = {
  repairShopId: Scalars['UUID']['input'];
  repairStatus?: InputMaybe<RepairStatus>;
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

export type QuoteDto = {
  __typename?: 'QuoteDto';
  laborCost: Scalars['String']['output'];
  partsCost: Scalars['String']['output'];
  quoteAccepted?: Maybe<Scalars['Boolean']['output']>;
  totalCost: Scalars['String']['output'];
};

export type QuoteRepairStepDto = RepairStepDto & {
  __typename?: 'QuoteRepairStepDto';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  quote: QuoteDto;
  status: RepairStatus;
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

export type RejectQuoteRequestInput = {
  actingRole: ActingRole;
  repairId: Scalars['UUID']['input'];
};

export type RepairActions = {
  __typename?: 'RepairActions';
  approveQuote: Scalars['Boolean']['output'];
  checkInAndQueue: Scalars['Boolean']['output'];
  completeRepairFailure: Scalars['Boolean']['output'];
  completeRepairSuccess: Scalars['Boolean']['output'];
  declareUnfixable: Scalars['Boolean']['output'];
  finalizeDelivery: Scalars['Boolean']['output'];
  partsArrived: Scalars['Boolean']['output'];
  partsNeeded: Scalars['Boolean']['output'];
  paymentCompleted: Scalars['Boolean']['output'];
  pickup: Scalars['Boolean']['output'];
  rejectQuote: Scalars['Boolean']['output'];
  reportComplaint: Scalars['Boolean']['output'];
  resolveComplaint: Scalars['Boolean']['output'];
  ship: Scalars['Boolean']['output'];
  startDiagnosis: Scalars['Boolean']['output'];
  startRepair: Scalars['Boolean']['output'];
  submitQuote: Scalars['Boolean']['output'];
};


export type RepairActionsApproveQuoteArgs = {
  request: ApproveQuoteRequestInput;
};


export type RepairActionsCheckInAndQueueArgs = {
  request: CheckInAndQueueRequestInput;
};


export type RepairActionsCompleteRepairFailureArgs = {
  request: CompleteRepairFailureRequestInput;
};


export type RepairActionsCompleteRepairSuccessArgs = {
  request: CompleteRepairSuccessRequestInput;
};


export type RepairActionsDeclareUnfixableArgs = {
  request: DeclareUnfixableRequestInput;
};


export type RepairActionsFinalizeDeliveryArgs = {
  request: FinalizeDeliveryRequestInput;
};


export type RepairActionsPartsArrivedArgs = {
  repairId: Scalars['UUID']['input'];
};


export type RepairActionsPartsNeededArgs = {
  repairId: Scalars['UUID']['input'];
};


export type RepairActionsPaymentCompletedArgs = {
  repairId: Scalars['UUID']['input'];
};


export type RepairActionsPickupArgs = {
  repairId: Scalars['UUID']['input'];
};


export type RepairActionsRejectQuoteArgs = {
  request: RejectQuoteRequestInput;
};


export type RepairActionsReportComplaintArgs = {
  repairId: Scalars['UUID']['input'];
};


export type RepairActionsResolveComplaintArgs = {
  repairId: Scalars['UUID']['input'];
};


export type RepairActionsShipArgs = {
  repairId: Scalars['UUID']['input'];
};


export type RepairActionsStartDiagnosisArgs = {
  repairId: Scalars['UUID']['input'];
};


export type RepairActionsStartRepairArgs = {
  repairId: Scalars['UUID']['input'];
};


export type RepairActionsSubmitQuoteArgs = {
  request: SubmitQuoteRequestInput;
};

export type RepairDto = {
  __typename?: 'RepairDto';
  additionalComment?: Maybe<Scalars['String']['output']>;
  assignedWorker?: Maybe<WorkerDto>;
  contactInfo: ContactInfoDto;
  conversationId?: Maybe<Scalars['UUID']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deviceInfo: DeviceInfoDto;
  faultInfo: FaultInfoDto;
  id: Scalars['UUID']['output'];
  images: Array<ImageDto>;
  repairDocument: Scalars['String']['output'];
  repairHistory: Array<RepairStepDto>;
  repairShop?: Maybe<RepairShopDto>;
  repairShopId: Scalars['UUID']['output'];
  returnInfo: ReturnInfoDto;
  status: RepairStatus;
  ticketNumber: Scalars['String']['output'];
};

export type RepairShopDto = {
  __typename?: 'RepairShopDto';
  aboutUs?: Maybe<Scalars['String']['output']>;
  address: AddressDto;
  conversations: CursorPaginatedListOfConversationDtoAndNullableOfGuid;
  email: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  mainImage?: Maybe<ImageDto>;
  miniatureImage?: Maybe<ImageDto>;
  name: Scalars['String']['output'];
  openingHours: OpeningHoursDto;
  phone: Scalars['String']['output'];
  rating: Scalars['Float']['output'];
  repairs: PaginatedListOfRepairDto;
  reviewCount: Scalars['Int']['output'];
  timeZoneId: Scalars['String']['output'];
};


export type RepairShopDtoConversationsArgs = {
  request: GetConversationListRequestInput;
};


export type RepairShopDtoRepairsArgs = {
  request: GetRepairListRequestInput;
};

export enum RepairShopImageType {
  Main = 'MAIN',
  Miniature = 'MINIATURE'
}

export enum RepairStatus {
  AwaitingApproval = 'AWAITING_APPROVAL',
  AwaitingDelivery = 'AWAITING_DELIVERY',
  AwaitingDiagnosis = 'AWAITING_DIAGNOSIS',
  AwaitingParts = 'AWAITING_PARTS',
  AwaitingRepair = 'AWAITING_REPAIR',
  AwaitingShipping = 'AWAITING_SHIPPING',
  Canceled = 'CANCELED',
  Complaint = 'COMPLAINT',
  Completed = 'COMPLETED',
  Created = 'CREATED',
  Diagnosing = 'DIAGNOSING',
  DiagnosisFeeRequired = 'DIAGNOSIS_FEE_REQUIRED',
  FinalPaymentRequired = 'FINAL_PAYMENT_REQUIRED',
  InRepair = 'IN_REPAIR',
  ReadyForPickup = 'READY_FOR_PICKUP',
  Received = 'RECEIVED',
  RepairFailed = 'REPAIR_FAILED',
  Shipped = 'SHIPPED',
  Unfixable = 'UNFIXABLE'
}

export type RepairStepDto = {
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  status: RepairStatus;
};

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

export type ReviewAuthorDto = {
  __typename?: 'ReviewAuthorDto';
  name: Scalars['String']['output'];
};

export type ReviewDto = {
  __typename?: 'ReviewDto';
  author?: Maybe<ReviewAuthorDto>;
  comment?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  rating: Scalars['Int']['output'];
};

export type SearchByNameRequestInput = {
  name: Scalars['String']['input'];
  pageNumber: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
};

export type SendMessageRequestInput = {
  conversationId: Scalars['UUID']['input'];
  message: Scalars['String']['input'];
};

export enum SenderRole {
  Customer = 'CUSTOMER',
  RepairShop = 'REPAIR_SHOP'
}

export type ServiceDto = {
  __typename?: 'ServiceDto';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  price: Scalars['String']['output'];
};

export type SubmitQuoteRequestInput = {
  currency: CurrencyCode;
  description?: InputMaybe<Scalars['String']['input']>;
  laborCost: Scalars['Decimal']['input'];
  partsCost: Scalars['Decimal']['input'];
  repairId: Scalars['UUID']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  onCustomerConversationsUpdated: ConversationDto;
  onMessageSent: MessageDto;
  onRepairShopConversationsUpdated: ConversationDto;
};


export type SubscriptionOnMessageSentArgs = {
  actingRole: ActingRole;
  conversationId: Scalars['UUID']['input'];
};


export type SubscriptionOnRepairShopConversationsUpdatedArgs = {
  repairShopId: Scalars['UUID']['input'];
};

export type TimeIntervalDto = {
  __typename?: 'TimeIntervalDto';
  from: Scalars['String']['output'];
  to: Scalars['String']['output'];
};

export type WorkerDto = {
  __typename?: 'WorkerDto';
  firstName: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  lastName: Scalars['String']['output'];
};

export type AddReviewMutationVariables = Exact<{
  repairShopId: Scalars['UUID']['input'];
  rating: Scalars['Int']['input'];
  comment?: InputMaybe<Scalars['String']['input']>;
}>;


export type AddReviewMutation = { __typename?: 'Mutation', addReview: boolean };

export type AuthContextQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthContextQuery = { __typename?: 'Query', me:
    | { __typename: 'FullCustomerDto', id: any, email: string, name: string, phone?: string | null, phoneRegionCode?: string | null, preferredContactMethod?: ContactMethod | null, preferredReturnMethod?: ReturnMethod | null, isBusiness: boolean, address?: { __typename?: 'AddressDto', recipientName: string, street: string, buildingNumber: string, apartmentNumber?: string | null, postalCode: string, city: string, country: Country } | null }
    | { __typename: 'FullWorkerDto', id: any, firstName: string, lastName: string, repairShop?: { __typename?: 'RepairShopDto', id: any } | null }
   };

export type BookRepairMutationVariables = Exact<{
  request: BookRepairRequestInput;
}>;


export type BookRepairMutation = { __typename?: 'Mutation', bookRepair: { __typename?: 'RepairDto', id: any, ticketNumber: string, repairDocument: string, createdAt: any, repairShop?: { __typename?: 'RepairShopDto', address: { __typename?: 'AddressDto', recipientName: string, street: string, buildingNumber: string, apartmentNumber?: string | null, postalCode: string, city: string, country: Country } } | null } };

export type ChangeAddressMutationVariables = Exact<{
  request: ChangeAddressRequestInput;
}>;


export type ChangeAddressMutation = { __typename?: 'Mutation', changeAddress: boolean };

export type ChangeEmailMutationVariables = Exact<{
  password: Scalars['String']['input'];
  newEmail: Scalars['String']['input'];
}>;


export type ChangeEmailMutation = { __typename?: 'Mutation', changeEmail: boolean };

export type ChangePasswordMutationVariables = Exact<{
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: boolean };

export type ChangePhoneNumberMutationVariables = Exact<{
  newPhoneNumber: Scalars['String']['input'];
  regionCode: Scalars['String']['input'];
}>;


export type ChangePhoneNumberMutation = { __typename?: 'Mutation', changePhoneNumber: boolean };

export type ChangePreferredContactMutationVariables = Exact<{
  contactMethod?: InputMaybe<ContactMethod>;
}>;


export type ChangePreferredContactMutation = { __typename?: 'Mutation', changePreferredContact: boolean };

export type ChangePreferredReturnMutationVariables = Exact<{
  returnMethod?: InputMaybe<ReturnMethod>;
}>;


export type ChangePreferredReturnMutation = { __typename?: 'Mutation', changePreferredReturn: boolean };

export type ConversationExistsQueryVariables = Exact<{
  repairShopId: Scalars['UUID']['input'];
  customerId: Scalars['UUID']['input'];
}>;


export type ConversationExistsQuery = { __typename?: 'Query', conversationByParticipants: { __typename?: 'ConversationDto', id: any } };

export type ConversationSubscriptionSubscriptionVariables = Exact<{
  conversationId: Scalars['UUID']['input'];
  actingRole: ActingRole;
}>;


export type ConversationSubscriptionSubscription = { __typename?: 'Subscription', onMessageSent: { __typename?: 'MessageDto', senderRole: SenderRole, content: string, createdAt: any } };

export type CreateConversationMutationVariables = Exact<{
  receiverId: Scalars['UUID']['input'];
  firstMessage: Scalars['String']['input'];
}>;


export type CreateConversationMutation = { __typename?: 'Mutation', createConversation: { __typename?: 'ConversationDto', id: any } };

export type CustomerConvListSubscriptionSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type CustomerConvListSubscriptionSubscription = { __typename?: 'Subscription', onCustomerConversationsUpdated: { __typename?: 'ConversationDto', id: any, modifiedAt: any, messages: { __typename?: 'CursorPaginatedListOfMessageDtoAndNullableOfGuid', items: Array<{ __typename?: 'MessageDto', id: any, content: string, createdAt: any, senderRole: SenderRole }> } } };

export type GetConversationQueryVariables = Exact<{
  conversationId: Scalars['UUID']['input'];
  numberOfMessages: Scalars['Int']['input'];
  lastMessageId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type GetConversationQuery = { __typename?: 'Query', conversation: { __typename?: 'ConversationDto', conversationType: ConversationType, messages: { __typename?: 'CursorPaginatedListOfMessageDtoAndNullableOfGuid', lastItemId?: any | null, hasMore: boolean, items: Array<{ __typename?: 'MessageDto', senderRole: SenderRole, content: string, createdAt: any }> }, repair?: { __typename?: 'RepairDto', id: any, ticketNumber: string, status: RepairStatus, deviceInfo: { __typename?: 'DeviceInfoDto', manufacturer: string, model: string } } | null, repairShop?: { __typename?: 'RepairShopDto', id: any, name: string, rating: number, reviewCount: number } | null, customer?: { __typename?: 'CustomerDto', id: any, name: string } | null } };

export type GetMoreMessagesQueryVariables = Exact<{
  conversationId: Scalars['UUID']['input'];
  numberOfMessages: Scalars['Int']['input'];
  lastMessageId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type GetMoreMessagesQuery = { __typename?: 'Query', conversation: { __typename?: 'ConversationDto', messages: { __typename?: 'CursorPaginatedListOfMessageDtoAndNullableOfGuid', lastItemId?: any | null, hasMore: boolean, items: Array<{ __typename?: 'MessageDto', senderRole: SenderRole, content: string, createdAt: any }> } } };

export type GetConversationsQueryVariables = Exact<{
  numberOfConversations: Scalars['Int']['input'];
  lastConversationId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type GetConversationsQuery = { __typename?: 'Query', me:
    | { __typename?: 'FullCustomerDto', id: any, conversations: { __typename?: 'CursorPaginatedListOfConversationDtoAndNullableOfGuid', hasMore: boolean, lastItemId?: any | null, items: Array<{ __typename?: 'ConversationDto', id: any, conversationType: ConversationType, createdAt: any, modifiedAt: any, repairShop?: { __typename?: 'RepairShopDto', id: any, name: string } | null, repair?: { __typename?: 'RepairDto', deviceInfo: { __typename?: 'DeviceInfoDto', manufacturer: string, model: string } } | null, messages: { __typename?: 'CursorPaginatedListOfMessageDtoAndNullableOfGuid', items: Array<{ __typename?: 'MessageDto', id: any, senderRole: SenderRole, content: string, createdAt: any }> } }> } }
    | { __typename?: 'FullWorkerDto', id: any, repairShop?: { __typename?: 'RepairShopDto', id: any, conversations: { __typename?: 'CursorPaginatedListOfConversationDtoAndNullableOfGuid', hasMore: boolean, lastItemId?: any | null, items: Array<{ __typename?: 'ConversationDto', id: any, conversationType: ConversationType, createdAt: any, modifiedAt: any, customer?: { __typename?: 'CustomerDto', id: any, name: string } | null, repair?: { __typename?: 'RepairDto', deviceInfo: { __typename?: 'DeviceInfoDto', manufacturer: string, model: string } } | null, messages: { __typename?: 'CursorPaginatedListOfMessageDtoAndNullableOfGuid', items: Array<{ __typename?: 'MessageDto', id: any, senderRole: SenderRole, content: string, createdAt: any }> } }> } } | null }
   };

export type GetCustomerRepairsQueryVariables = Exact<{
  pageNumber: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
}>;


export type GetCustomerRepairsQuery = { __typename?: 'Query', me:
    | { __typename: 'FullCustomerDto', id: any, repairs: { __typename?: 'PaginatedListOfRepairDto', pageNumber: number, pageSize: number, totalCount: number, totalPages: number, items: Array<{ __typename?: 'RepairDto', id: any, ticketNumber: string, status: RepairStatus, deviceInfo: { __typename?: 'DeviceInfoDto', manufacturer: string, model: string }, faultInfo: { __typename?: 'FaultInfoDto', description: string } }> } }
    | { __typename: 'FullWorkerDto' }
   };

export type GetDashboardQueryVariables = Exact<{
  repairShopId: Scalars['UUID']['input'];
}>;


export type GetDashboardQuery = { __typename?: 'Query', awaitingDiagnosis: number, awaitingRepair: number, awaitingShipping: number, readyForPickup: number, complaint: number, activeRepair:
    | { __typename?: 'FullCustomerDto' }
    | { __typename?: 'FullWorkerDto', id: any, activeRepair?: { __typename?: 'RepairDto', id: any, ticketNumber: string, status: RepairStatus, deviceInfo: { __typename?: 'DeviceInfoDto', manufacturer: string, model: string }, faultInfo: { __typename?: 'FaultInfoDto', description: string } } | null }
  , conversations: { __typename?: 'RepairShopDto', conversations: { __typename?: 'CursorPaginatedListOfConversationDtoAndNullableOfGuid', items: Array<{ __typename?: 'ConversationDto', id: any, conversationType: ConversationType, repair?: { __typename?: 'RepairDto', id: any, deviceInfo: { __typename?: 'DeviceInfoDto', model: string, manufacturer: string } } | null, customer?: { __typename?: 'CustomerDto', id: any, name: string } | null, messages: { __typename?: 'CursorPaginatedListOfMessageDtoAndNullableOfGuid', items: Array<{ __typename?: 'MessageDto', id: any, content: string, createdAt: any }> } }> } } };

export type GetRepairQueryVariables = Exact<{
  repairId: Scalars['UUID']['input'];
}>;


export type GetRepairQuery = { __typename?: 'Query', repair: { __typename?: 'RepairDto', id: any, ticketNumber: string, conversationId?: any | null, status: RepairStatus, additionalComment?: string | null, repairShop?: { __typename?: 'RepairShopDto', id: any, name: string } | null, deviceInfo: { __typename?: 'DeviceInfoDto', deviceType: DeviceType, manufacturer: string, model: string, serialNumber: string }, faultInfo: { __typename?: 'FaultInfoDto', whenOccurred: string, howToReproduce: string, description: string, previouslyRepaired: boolean }, images: Array<{ __typename?: 'ImageDto', id: any, small: string, medium: string, large: string, extraLarge: string }>, repairHistory: Array<
      | { __typename?: 'NormalRepairStepDto', id: any, status: RepairStatus, createdAt: any, description?: string | null }
      | { __typename?: 'PaymentRepairStepDto', amount: string, paid: boolean, id: any, status: RepairStatus, createdAt: any, description?: string | null }
      | { __typename?: 'QuoteRepairStepDto', id: any, status: RepairStatus, createdAt: any, description?: string | null, quote: { __typename?: 'QuoteDto', laborCost: string, partsCost: string, totalCost: string, quoteAccepted?: boolean | null } }
    > } };

export type GetRepairShopQueryVariables = Exact<{
  repairShopId: Scalars['UUID']['input'];
}>;


export type GetRepairShopQuery = { __typename?: 'Query', repairShop: { __typename?: 'RepairShopDto', id: any, name: string, email: string, phone: string, timeZoneId: string, rating: number, reviewCount: number, aboutUs?: string | null, mainImage?: { __typename?: 'ImageDto', extraLarge: string } | null, address: { __typename?: 'AddressDto', street: string, buildingNumber: string, apartmentNumber?: string | null, postalCode: string, city: string }, openingHours: { __typename?: 'OpeningHoursDto', monday?: { __typename?: 'TimeIntervalDto', from: string, to: string } | null, tuesday?: { __typename?: 'TimeIntervalDto', from: string, to: string } | null, wednesday?: { __typename?: 'TimeIntervalDto', from: string, to: string } | null, thursday?: { __typename?: 'TimeIntervalDto', from: string, to: string } | null, friday?: { __typename?: 'TimeIntervalDto', from: string, to: string } | null, saturday?: { __typename?: 'TimeIntervalDto', from: string, to: string } | null, sunday?: { __typename?: 'TimeIntervalDto', from: string, to: string } | null } } };

export type GetRepairShopForNewConvQueryVariables = Exact<{
  repairShopId: Scalars['UUID']['input'];
}>;


export type GetRepairShopForNewConvQuery = { __typename?: 'Query', repairShop: { __typename?: 'RepairShopDto', id: any, name: string, rating: number, reviewCount: number } };

export type GetRepairShopRepairsQueryVariables = Exact<{
  repairShopId: Scalars['UUID']['input'];
  pageNumber: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
}>;


export type GetRepairShopRepairsQuery = { __typename?: 'Query', repairShop: { __typename?: 'RepairShopDto', id: any, repairs: { __typename?: 'PaginatedListOfRepairDto', pageNumber: number, pageSize: number, totalCount: number, totalPages: number, items: Array<{ __typename?: 'RepairDto', id: any, ticketNumber: string, status: RepairStatus, createdAt: any, contactInfo: { __typename?: 'ContactInfoDto', fullName: string }, deviceInfo: { __typename?: 'DeviceInfoDto', manufacturer: string, model: string }, faultInfo: { __typename?: 'FaultInfoDto', description: string }, assignedWorker?: { __typename?: 'WorkerDto', firstName: string, lastName: string } | null }> } } };

export type ReviewsQueryVariables = Exact<{
  repairShopId: Scalars['UUID']['input'];
  pageNumber: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
}>;


export type ReviewsQuery = { __typename?: 'Query', reviews: { __typename?: 'PaginatedListOfReviewDto', pageNumber: number, totalCount: number, totalPages: number, items: Array<{ __typename?: 'ReviewDto', id: string, rating: number, comment?: string | null, author?: { __typename?: 'ReviewAuthorDto', name: string } | null }> } };

export type ServicesQueryVariables = Exact<{
  repairShopId: Scalars['UUID']['input'];
  pageNumber: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
}>;


export type ServicesQuery = { __typename?: 'Query', services: { __typename?: 'PaginatedListOfServiceDto', pageNumber: number, totalCount: number, totalPages: number, items: Array<{ __typename?: 'ServiceDto', name: string, price: string }> } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  rememberMe: Scalars['Boolean']['input'];
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

export type RemoveAddressMutationVariables = Exact<{ [key: string]: never; }>;


export type RemoveAddressMutation = { __typename?: 'Mutation', removeAddress: boolean };

export type RemovePhoneNumberMutationVariables = Exact<{ [key: string]: never; }>;


export type RemovePhoneNumberMutation = { __typename?: 'Mutation', removePhoneNumber: boolean };

export type ApproveQuoteMutationVariables = Exact<{
  repairId: Scalars['UUID']['input'];
  actingRole: ActingRole;
}>;


export type ApproveQuoteMutation = { __typename?: 'Mutation', repairActions: { __typename?: 'RepairActions', approveQuote: boolean } };

export type RejectQuoteMutationVariables = Exact<{
  repairId: Scalars['UUID']['input'];
  actingRole: ActingRole;
}>;


export type RejectQuoteMutation = { __typename?: 'Mutation', repairActions: { __typename?: 'RepairActions', rejectQuote: boolean } };

export type RepairShopConvListSubscriptionSubscriptionVariables = Exact<{
  repairShopId: Scalars['UUID']['input'];
}>;


export type RepairShopConvListSubscriptionSubscription = { __typename?: 'Subscription', onRepairShopConversationsUpdated: { __typename?: 'ConversationDto', id: any, modifiedAt: any, messages: { __typename?: 'CursorPaginatedListOfMessageDtoAndNullableOfGuid', items: Array<{ __typename?: 'MessageDto', id: any, content: string, createdAt: any, senderRole: SenderRole }> } } };

export type SearchQueryVariables = Exact<{
  name: Scalars['String']['input'];
  pageNumber: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
}>;


export type SearchQuery = { __typename?: 'Query', searchShopsByName: { __typename?: 'PaginatedListOfRepairShopDto', pageNumber: number, totalCount: number, totalPages: number, items: Array<{ __typename?: 'RepairShopDto', id: any, name: string, timeZoneId: string, rating: number, reviewCount: number, miniatureImage?: { __typename?: 'ImageDto', small: string } | null, address: { __typename?: 'AddressDto', street: string, buildingNumber: string, apartmentNumber?: string | null, postalCode: string, city: string }, openingHours: { __typename?: 'OpeningHoursDto', monday?: { __typename?: 'TimeIntervalDto', from: string, to: string } | null, tuesday?: { __typename?: 'TimeIntervalDto', from: string, to: string } | null, wednesday?: { __typename?: 'TimeIntervalDto', from: string, to: string } | null, thursday?: { __typename?: 'TimeIntervalDto', from: string, to: string } | null, friday?: { __typename?: 'TimeIntervalDto', from: string, to: string } | null, saturday?: { __typename?: 'TimeIntervalDto', from: string, to: string } | null, sunday?: { __typename?: 'TimeIntervalDto', from: string, to: string } | null } }> } };

export type SendMessageMutationVariables = Exact<{
  conversationId: Scalars['UUID']['input'];
  message: Scalars['String']['input'];
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage: boolean };


export const AddReviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddReview"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repairShopId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"rating"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"comment"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addReview"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"repairShopId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairShopId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"rating"},"value":{"kind":"Variable","name":{"kind":"Name","value":"rating"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"comment"},"value":{"kind":"Variable","name":{"kind":"Name","value":"comment"}}}]}}]}]}}]} as unknown as DocumentNode<AddReviewMutation, AddReviewMutationVariables>;
export const AuthContextDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AuthContext"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FullCustomerDto"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"phoneRegionCode"}},{"kind":"Field","name":{"kind":"Name","value":"preferredContactMethod"}},{"kind":"Field","name":{"kind":"Name","value":"preferredReturnMethod"}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipientName"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"buildingNumber"}},{"kind":"Field","name":{"kind":"Name","value":"apartmentNumber"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isBusiness"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FullWorkerDto"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"repairShop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AuthContextQuery, AuthContextQueryVariables>;
export const BookRepairDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"BookRepair"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BookRepairRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookRepair"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ticketNumber"}},{"kind":"Field","name":{"kind":"Name","value":"repairDocument"}},{"kind":"Field","name":{"kind":"Name","value":"repairShop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipientName"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"buildingNumber"}},{"kind":"Field","name":{"kind":"Name","value":"apartmentNumber"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<BookRepairMutation, BookRepairMutationVariables>;
export const ChangeAddressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeAddress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChangeAddressRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeAddress"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}]}]}}]} as unknown as DocumentNode<ChangeAddressMutation, ChangeAddressMutationVariables>;
export const ChangeEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newEmail"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"newEmail"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newEmail"}}}]}}]}]}}]} as unknown as DocumentNode<ChangeEmailMutation, ChangeEmailMutationVariables>;
export const ChangePasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangePassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"currentPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changePassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"currentPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"currentPassword"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"newPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}}}]}}]}]}}]} as unknown as DocumentNode<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ChangePhoneNumberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangePhoneNumber"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPhoneNumber"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"regionCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changePhoneNumber"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"newPhoneNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPhoneNumber"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"regionCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"regionCode"}}}]}}]}]}}]} as unknown as DocumentNode<ChangePhoneNumberMutation, ChangePhoneNumberMutationVariables>;
export const ChangePreferredContactDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangePreferredContact"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contactMethod"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ContactMethod"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changePreferredContact"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"contactMethod"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contactMethod"}}}]}]}}]} as unknown as DocumentNode<ChangePreferredContactMutation, ChangePreferredContactMutationVariables>;
export const ChangePreferredReturnDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangePreferredReturn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"returnMethod"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ReturnMethod"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changePreferredReturn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"returnMethod"},"value":{"kind":"Variable","name":{"kind":"Name","value":"returnMethod"}}}]}]}}]} as unknown as DocumentNode<ChangePreferredReturnMutation, ChangePreferredReturnMutationVariables>;
export const ConversationExistsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ConversationExists"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repairShopId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"customerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"conversationByParticipants"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"repairShopId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairShopId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"customerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"customerId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ConversationExistsQuery, ConversationExistsQueryVariables>;
export const ConversationSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"ConversationSubscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"conversationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"actingRole"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ActingRole"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onMessageSent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"conversationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"conversationId"}}},{"kind":"Argument","name":{"kind":"Name","value":"actingRole"},"value":{"kind":"Variable","name":{"kind":"Name","value":"actingRole"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"senderRole"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<ConversationSubscriptionSubscription, ConversationSubscriptionSubscriptionVariables>;
export const CreateConversationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateConversation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"receiverId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstMessage"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createConversation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"receiverId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"receiverId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"firstMessage"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstMessage"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateConversationMutation, CreateConversationMutationVariables>;
export const CustomerConvListSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"CustomerConvListSubscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onCustomerConversationsUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"numberOfMessages"},"value":{"kind":"IntValue","value":"1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"senderRole"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CustomerConvListSubscriptionSubscription, CustomerConvListSubscriptionSubscriptionVariables>;
export const GetConversationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetConversation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"conversationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"numberOfMessages"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastMessageId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"conversation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"conversationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"conversationId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"numberOfMessages"},"value":{"kind":"Variable","name":{"kind":"Name","value":"numberOfMessages"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"lastMessageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastMessageId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"senderRole"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lastItemId"}},{"kind":"Field","name":{"kind":"Name","value":"hasMore"}}]}},{"kind":"Field","name":{"kind":"Name","value":"conversationType"}},{"kind":"Field","name":{"kind":"Name","value":"repair"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ticketNumber"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"deviceInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"manufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"model"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"repairShop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"reviewCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetConversationQuery, GetConversationQueryVariables>;
export const GetMoreMessagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMoreMessages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"conversationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"numberOfMessages"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastMessageId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"conversation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"conversationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"conversationId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"numberOfMessages"},"value":{"kind":"Variable","name":{"kind":"Name","value":"numberOfMessages"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"lastMessageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastMessageId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"senderRole"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lastItemId"}},{"kind":"Field","name":{"kind":"Name","value":"hasMore"}}]}}]}}]}}]} as unknown as DocumentNode<GetMoreMessagesQuery, GetMoreMessagesQueryVariables>;
export const GetConversationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetConversations"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"numberOfConversations"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastConversationId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FullCustomerDto"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"conversations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"numberOfConversations"},"value":{"kind":"Variable","name":{"kind":"Name","value":"numberOfConversations"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"lastConversationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastConversationId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"conversationType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"repairShop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"repair"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deviceInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"manufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"model"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"numberOfMessages"},"value":{"kind":"IntValue","value":"1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"senderRole"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"hasMore"}},{"kind":"Field","name":{"kind":"Name","value":"lastItemId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FullWorkerDto"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"repairShop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"conversations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"numberOfConversations"},"value":{"kind":"Variable","name":{"kind":"Name","value":"numberOfConversations"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"lastConversationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastConversationId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"conversationType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"repair"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deviceInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"manufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"model"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"numberOfMessages"},"value":{"kind":"IntValue","value":"1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"senderRole"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"hasMore"}},{"kind":"Field","name":{"kind":"Name","value":"lastItemId"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetConversationsQuery, GetConversationsQueryVariables>;
export const GetCustomerRepairsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCustomerRepairs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FullCustomerDto"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"repairs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pageNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ticketNumber"}},{"kind":"Field","name":{"kind":"Name","value":"deviceInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"manufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"model"}}]}},{"kind":"Field","name":{"kind":"Name","value":"faultInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageNumber"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetCustomerRepairsQuery, GetCustomerRepairsQueryVariables>;
export const GetDashboardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDashboard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repairShopId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"awaitingDiagnosis"},"name":{"kind":"Name","value":"repairCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"repairShopId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairShopId"}}},{"kind":"Argument","name":{"kind":"Name","value":"repairStatus"},"value":{"kind":"EnumValue","value":"AWAITING_DIAGNOSIS"}}]},{"kind":"Field","alias":{"kind":"Name","value":"awaitingRepair"},"name":{"kind":"Name","value":"repairCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"repairShopId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairShopId"}}},{"kind":"Argument","name":{"kind":"Name","value":"repairStatus"},"value":{"kind":"EnumValue","value":"AWAITING_REPAIR"}}]},{"kind":"Field","alias":{"kind":"Name","value":"awaitingShipping"},"name":{"kind":"Name","value":"repairCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"repairShopId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairShopId"}}},{"kind":"Argument","name":{"kind":"Name","value":"repairStatus"},"value":{"kind":"EnumValue","value":"AWAITING_SHIPPING"}}]},{"kind":"Field","alias":{"kind":"Name","value":"readyForPickup"},"name":{"kind":"Name","value":"repairCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"repairShopId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairShopId"}}},{"kind":"Argument","name":{"kind":"Name","value":"repairStatus"},"value":{"kind":"EnumValue","value":"READY_FOR_PICKUP"}}]},{"kind":"Field","alias":{"kind":"Name","value":"complaint"},"name":{"kind":"Name","value":"repairCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"repairShopId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairShopId"}}},{"kind":"Argument","name":{"kind":"Name","value":"repairStatus"},"value":{"kind":"EnumValue","value":"COMPLAINT"}}]},{"kind":"Field","alias":{"kind":"Name","value":"activeRepair"},"name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FullWorkerDto"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"activeRepair"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ticketNumber"}},{"kind":"Field","name":{"kind":"Name","value":"deviceInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"manufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"model"}}]}},{"kind":"Field","name":{"kind":"Name","value":"faultInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"conversations"},"name":{"kind":"Name","value":"repairShop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"repairShopId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairShopId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"conversations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"numberOfConversations"},"value":{"kind":"IntValue","value":"3"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"conversationType"}},{"kind":"Field","name":{"kind":"Name","value":"repair"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"deviceInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"manufacturer"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"numberOfMessages"},"value":{"kind":"IntValue","value":"1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetDashboardQuery, GetDashboardQueryVariables>;
export const GetRepairDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRepair"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repair"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"repairId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ticketNumber"}},{"kind":"Field","name":{"kind":"Name","value":"conversationId"}},{"kind":"Field","name":{"kind":"Name","value":"repairShop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"deviceInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deviceType"}},{"kind":"Field","name":{"kind":"Name","value":"manufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"serialNumber"}}]}},{"kind":"Field","name":{"kind":"Name","value":"faultInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"whenOccurred"}},{"kind":"Field","name":{"kind":"Name","value":"howToReproduce"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"previouslyRepaired"}}]}},{"kind":"Field","name":{"kind":"Name","value":"additionalComment"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"medium"}},{"kind":"Field","name":{"kind":"Name","value":"large"}},{"kind":"Field","name":{"kind":"Name","value":"extraLarge"}}]}},{"kind":"Field","name":{"kind":"Name","value":"repairHistory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PaymentRepairStepDto"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"paid"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QuoteRepairStepDto"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"quote"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"laborCost"}},{"kind":"Field","name":{"kind":"Name","value":"partsCost"}},{"kind":"Field","name":{"kind":"Name","value":"totalCost"}},{"kind":"Field","name":{"kind":"Name","value":"quoteAccepted"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetRepairQuery, GetRepairQueryVariables>;
export const GetRepairShopDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRepairShop"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repairShopId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repairShop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"repairShopId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairShopId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mainImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"extraLarge"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"timeZoneId"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"reviewCount"}},{"kind":"Field","name":{"kind":"Name","value":"aboutUs"}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"buildingNumber"}},{"kind":"Field","name":{"kind":"Name","value":"apartmentNumber"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"city"}}]}},{"kind":"Field","name":{"kind":"Name","value":"openingHours"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"monday"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tuesday"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wednesday"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}}]}},{"kind":"Field","name":{"kind":"Name","value":"thursday"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}}]}},{"kind":"Field","name":{"kind":"Name","value":"friday"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}}]}},{"kind":"Field","name":{"kind":"Name","value":"saturday"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sunday"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetRepairShopQuery, GetRepairShopQueryVariables>;
export const GetRepairShopForNewConvDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRepairShopForNewConv"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repairShopId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repairShop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"repairShopId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairShopId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"reviewCount"}}]}}]}}]} as unknown as DocumentNode<GetRepairShopForNewConvQuery, GetRepairShopForNewConvQueryVariables>;
export const GetRepairShopRepairsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRepairShopRepairs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repairShopId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repairShop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"repairShopId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairShopId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"repairs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pageNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ticketNumber"}},{"kind":"Field","name":{"kind":"Name","value":"contactInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"deviceInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"manufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"model"}}]}},{"kind":"Field","name":{"kind":"Name","value":"faultInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assignedWorker"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageNumber"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]}}]} as unknown as DocumentNode<GetRepairShopRepairsQuery, GetRepairShopRepairsQueryVariables>;
export const ReviewsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Reviews"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repairShopId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reviews"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"repairShopId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairShopId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"pageNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageNumber"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]} as unknown as DocumentNode<ReviewsQuery, ReviewsQueryVariables>;
export const ServicesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Services"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repairShopId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"services"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"repairShopId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairShopId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"pageNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageNumber"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]} as unknown as DocumentNode<ServicesQuery, ServicesQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"rememberMe"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"rememberMe"},"value":{"kind":"Variable","name":{"kind":"Name","value":"rememberMe"}}}]}}]}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isBusiness"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taxIdNumber"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"isBusiness"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isBusiness"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"firstName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"lastName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"companyName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyName"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"taxIdNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taxIdNumber"}}}]}}]}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const RemoveAddressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeAddress"}}]}}]} as unknown as DocumentNode<RemoveAddressMutation, RemoveAddressMutationVariables>;
export const RemovePhoneNumberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemovePhoneNumber"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removePhoneNumber"}}]}}]} as unknown as DocumentNode<RemovePhoneNumberMutation, RemovePhoneNumberMutationVariables>;
export const ApproveQuoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ApproveQuote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"actingRole"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ActingRole"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repairActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"approveQuote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"repairId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"actingRole"},"value":{"kind":"Variable","name":{"kind":"Name","value":"actingRole"}}}]}}]}]}}]}}]} as unknown as DocumentNode<ApproveQuoteMutation, ApproveQuoteMutationVariables>;
export const RejectQuoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RejectQuote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"actingRole"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ActingRole"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repairActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rejectQuote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"repairId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"actingRole"},"value":{"kind":"Variable","name":{"kind":"Name","value":"actingRole"}}}]}}]}]}}]}}]} as unknown as DocumentNode<RejectQuoteMutation, RejectQuoteMutationVariables>;
export const RepairShopConvListSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"RepairShopConvListSubscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repairShopId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onRepairShopConversationsUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"repairShopId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairShopId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"numberOfMessages"},"value":{"kind":"IntValue","value":"1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"senderRole"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RepairShopConvListSubscriptionSubscription, RepairShopConvListSubscriptionSubscriptionVariables>;
export const SearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Search"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchShopsByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"pageNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"miniatureImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"small"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"timeZoneId"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"reviewCount"}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"buildingNumber"}},{"kind":"Field","name":{"kind":"Name","value":"apartmentNumber"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"city"}}]}},{"kind":"Field","name":{"kind":"Name","value":"openingHours"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"monday"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tuesday"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wednesday"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}}]}},{"kind":"Field","name":{"kind":"Name","value":"thursday"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}}]}},{"kind":"Field","name":{"kind":"Name","value":"friday"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}}]}},{"kind":"Field","name":{"kind":"Name","value":"saturday"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sunday"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageNumber"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]} as unknown as DocumentNode<SearchQuery, SearchQueryVariables>;
export const SendMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"conversationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"message"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"conversationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"conversationId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"message"}}}]}}]}]}}]} as unknown as DocumentNode<SendMessageMutation, SendMessageMutationVariables>;