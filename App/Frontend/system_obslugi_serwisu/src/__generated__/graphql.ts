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

export type AddPartRequestInput = {
  initialStock: Scalars['Int']['input'];
  lowStockThreshold: Scalars['Int']['input'];
  manufacturerCode: Scalars['String']['input'];
  name: Scalars['String']['input'];
  partCategoryId: Scalars['UUID']['input'];
  price: Scalars['Decimal']['input'];
};

export type AddRepairNoteRequestInput = {
  content: Scalars['String']['input'];
  repairId: Scalars['UUID']['input'];
};

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

export type GetRepairShopsRepairListRequestInput = {
  filter: RepairFilterInput;
  pageNumber: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  sortBy?: InputMaybe<RepairSortField>;
  sortDirection?: InputMaybe<SortDirection>;
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
  addPart: Scalars['Boolean']['output'];
  addPartCategory: Scalars['Boolean']['output'];
  addRepairImage: Scalars['String']['output'];
  addRepairNote: Scalars['Boolean']['output'];
  addRepairShopImage: Scalars['String']['output'];
  addReview: Scalars['Boolean']['output'];
  adjustStock: Scalars['Boolean']['output'];
  assignWorker: Scalars['Boolean']['output'];
  bookRepair: RepairDto;
  changeAddress: Scalars['Boolean']['output'];
  changeEmail: Scalars['Boolean']['output'];
  changePassword: Scalars['Boolean']['output'];
  changePhoneNumber: Scalars['Boolean']['output'];
  changePreferredContact: Scalars['Boolean']['output'];
  changePreferredReturn: Scalars['Boolean']['output'];
  changeReorderFlag: Scalars['Boolean']['output'];
  createConversation: ConversationDto;
  deletePartCategory: Scalars['Boolean']['output'];
  deleteRepairImage: Scalars['Boolean']['output'];
  deleteRepairNote: Scalars['Boolean']['output'];
  deleteReview: Scalars['Boolean']['output'];
  editPartCategory: Scalars['Boolean']['output'];
  login: Scalars['Boolean']['output'];
  logout: Scalars['Boolean']['output'];
  register: Scalars['Boolean']['output'];
  removeAddress: Scalars['Boolean']['output'];
  removePhoneNumber: Scalars['Boolean']['output'];
  repairActions: RepairActions;
  sendMessage: Scalars['Boolean']['output'];
  unassignWorker: Scalars['Boolean']['output'];
};


export type MutationAddPartArgs = {
  request: AddPartRequestInput;
};


export type MutationAddPartCategoryArgs = {
  name: Scalars['String']['input'];
};


export type MutationAddRepairImageArgs = {
  contentType: Scalars['String']['input'];
  repairId: Scalars['UUID']['input'];
};


export type MutationAddRepairNoteArgs = {
  request: AddRepairNoteRequestInput;
};


export type MutationAddRepairShopImageArgs = {
  contentType: Scalars['String']['input'];
  imageType: RepairShopImageType;
  repairShopId: Scalars['UUID']['input'];
};


export type MutationAddReviewArgs = {
  request: AddReviewRequestInput;
};


export type MutationAdjustStockArgs = {
  newStock: Scalars['Int']['input'];
  partId: Scalars['UUID']['input'];
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


export type MutationChangeReorderFlagArgs = {
  partId: Scalars['UUID']['input'];
};


export type MutationCreateConversationArgs = {
  request: CreateConversationRequestInput;
};


export type MutationDeletePartCategoryArgs = {
  partCategoryId: Scalars['UUID']['input'];
};


export type MutationDeleteRepairImageArgs = {
  imageId: Scalars['UUID']['input'];
};


export type MutationDeleteRepairNoteArgs = {
  repairNoteId: Scalars['UUID']['input'];
};


export type MutationDeleteReviewArgs = {
  request: DeleteReviewRequestInput;
};


export type MutationEditPartCategoryArgs = {
  name: Scalars['String']['input'];
  partCategoryId: Scalars['UUID']['input'];
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

export type PaginatedListOfPartDto = {
  __typename?: 'PaginatedListOfPartDto';
  items: Array<PartDto>;
  pageNumber: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PaginatedListOfPartNeededDto = {
  __typename?: 'PaginatedListOfPartNeededDto';
  items: Array<PartNeededDto>;
  pageNumber: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PaginatedListOfPartReservationDto = {
  __typename?: 'PaginatedListOfPartReservationDto';
  items: Array<PartReservationDto>;
  pageNumber: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
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

export type PartCategoryDto = {
  __typename?: 'PartCategoryDto';
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
};

export type PartDto = {
  __typename?: 'PartDto';
  available: Scalars['Int']['output'];
  category?: Maybe<PartCategoryDto>;
  id: Scalars['UUID']['output'];
  lowStockThreshold: Scalars['Int']['output'];
  manufacturerCode: Scalars['String']['output'];
  name: Scalars['String']['output'];
  needsReorder: Scalars['Boolean']['output'];
  price: Scalars['Decimal']['output'];
  reserved: Scalars['Int']['output'];
  stock: Scalars['Int']['output'];
  stockLevel: StockLevel;
};

export type PartFilterInput = {
  categories?: InputMaybe<Array<Scalars['UUID']['input']>>;
  needsReorder?: InputMaybe<Scalars['Boolean']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  stockLevels?: InputMaybe<Array<StockLevel>>;
};

export type PartNeededDto = {
  __typename?: 'PartNeededDto';
  part?: Maybe<PartDto>;
  partId: Scalars['UUID']['output'];
  quantity: Scalars['Int']['output'];
  repair?: Maybe<RepairDto>;
  repairId: Scalars['UUID']['output'];
};

export type PartReservationDto = {
  __typename?: 'PartReservationDto';
  id: Scalars['UUID']['output'];
  partId: Scalars['UUID']['output'];
  quantityRequested: Scalars['Int']['output'];
  quantityReserved: Scalars['Int']['output'];
  repair?: Maybe<RepairDto>;
  repairId: Scalars['UUID']['output'];
  status: ReservationStatus;
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
  part: PartDto;
  partCategories: Array<PartCategoryDto>;
  partReservations: PaginatedListOfPartReservationDto;
  parts: PaginatedListOfPartDto;
  partsNeeded: PaginatedListOfPartNeededDto;
  repair: RepairDto;
  repairCount: Scalars['Int']['output'];
  repairNotes: Array<RepairNoteDto>;
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


export type QueryPartArgs = {
  partId: Scalars['UUID']['input'];
};


export type QueryPartReservationsArgs = {
  pageNumber: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  partId: Scalars['UUID']['input'];
};


export type QueryPartsArgs = {
  filter: PartFilterInput;
  pageNumber: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
};


export type QueryPartsNeededArgs = {
  pageNumber: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  repairId: Scalars['UUID']['input'];
};


export type QueryRepairArgs = {
  request: GetRepairRequestInput;
};


export type QueryRepairCountArgs = {
  repairShopId: Scalars['UUID']['input'];
  repairStatus?: InputMaybe<RepairStatus>;
};


export type QueryRepairNotesArgs = {
  repairId: Scalars['UUID']['input'];
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
  repairId: Scalars['UUID']['input'];
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
  repairId: Scalars['UUID']['input'];
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
  repairId: Scalars['UUID']['input'];
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

export type RepairFilterInput = {
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  statuses?: InputMaybe<Array<RepairStatus>>;
  workerIds?: InputMaybe<Array<Scalars['UUID']['input']>>;
};

export type RepairNoteDto = {
  __typename?: 'RepairNoteDto';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['UUID']['output'];
  repairId: Scalars['UUID']['output'];
  worker?: Maybe<WorkerDto>;
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
  request: GetRepairShopsRepairListRequestInput;
};

export enum RepairShopImageType {
  Main = 'MAIN',
  Miniature = 'MINIATURE'
}

export enum RepairSortField {
  CreatedAt = 'CREATED_AT',
  CustomerName = 'CUSTOMER_NAME',
  DeviceName = 'DEVICE_NAME',
  Status = 'STATUS'
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

export enum ReservationStatus {
  AwaitingStock = 'AWAITING_STOCK',
  Canceled = 'CANCELED',
  Consumed = 'CONSUMED',
  Reserved = 'RESERVED'
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

export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export enum StockLevel {
  Low = 'LOW',
  Normal = 'NORMAL',
  OutOfStock = 'OUT_OF_STOCK'
}

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

export type AddPartMutationVariables = Exact<{
  request: AddPartRequestInput;
}>;


export type AddPartMutation = { __typename?: 'Mutation', addPart: boolean };

export type AddPartCategoryMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type AddPartCategoryMutation = { __typename?: 'Mutation', addPartCategory: boolean };

export type AddRepairNoteMutationVariables = Exact<{
  repairId: Scalars['UUID']['input'];
  content: Scalars['String']['input'];
}>;


export type AddRepairNoteMutation = { __typename?: 'Mutation', addRepairNote: boolean };

export type AddReviewMutationVariables = Exact<{
  repairShopId: Scalars['UUID']['input'];
  rating: Scalars['Int']['input'];
  comment?: InputMaybe<Scalars['String']['input']>;
}>;


export type AddReviewMutation = { __typename?: 'Mutation', addReview: boolean };

export type AdjustStockMutationVariables = Exact<{
  partId: Scalars['UUID']['input'];
  newStock: Scalars['Int']['input'];
}>;


export type AdjustStockMutation = { __typename?: 'Mutation', adjustStock: boolean };

export type AssignYourselfMutationVariables = Exact<{
  repairId: Scalars['UUID']['input'];
}>;


export type AssignYourselfMutation = { __typename?: 'Mutation', assignWorker: boolean };

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

export type ChangeReorderFlagMutationVariables = Exact<{
  partId: Scalars['UUID']['input'];
}>;


export type ChangeReorderFlagMutation = { __typename?: 'Mutation', changeReorderFlag: boolean };

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

export type DeletePartCategoryMutationVariables = Exact<{
  partCategoryId: Scalars['UUID']['input'];
}>;


export type DeletePartCategoryMutation = { __typename?: 'Mutation', deletePartCategory: boolean };

export type DeleteRepairImageMutationVariables = Exact<{
  imageId: Scalars['UUID']['input'];
}>;


export type DeleteRepairImageMutation = { __typename?: 'Mutation', deleteRepairImage: boolean };

export type DeleteRepairNoteMutationVariables = Exact<{
  repairNoteId: Scalars['UUID']['input'];
}>;


export type DeleteRepairNoteMutation = { __typename?: 'Mutation', deleteRepairNote: boolean };

export type EditPartCategoryMutationVariables = Exact<{
  partCategoryId: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
}>;


export type EditPartCategoryMutation = { __typename?: 'Mutation', editPartCategory: boolean };

export type GetAssignedTechnicianQueryVariables = Exact<{
  repairId: Scalars['UUID']['input'];
}>;


export type GetAssignedTechnicianQuery = { __typename?: 'Query', repair: { __typename?: 'RepairDto', id: any, assignedWorker?: { __typename?: 'WorkerDto', id: any, firstName: string, lastName: string } | null } };

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

export type GetNeededPartsQueryVariables = Exact<{
  repairId: Scalars['UUID']['input'];
  pageNumber: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
}>;


export type GetNeededPartsQuery = { __typename?: 'Query', partsNeeded: { __typename?: 'PaginatedListOfPartNeededDto', pageNumber: number, pageSize: number, totalCount: number, totalPages: number, items: Array<{ __typename?: 'PartNeededDto', partId: any, part?: { __typename?: 'PartDto', name: string, stock: number, stockLevel: StockLevel, price: any } | null }> } };

export type GetPartQueryVariables = Exact<{
  partId: Scalars['UUID']['input'];
}>;


export type GetPartQuery = { __typename?: 'Query', part: { __typename?: 'PartDto', id: any, name: string, manufacturerCode: string, needsReorder: boolean, stock: number, stockLevel: StockLevel, lowStockThreshold: number, price: any, category?: { __typename?: 'PartCategoryDto', id: any, name: string } | null } };

export type GetPartCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPartCategoriesQuery = { __typename?: 'Query', partCategories: Array<{ __typename?: 'PartCategoryDto', id: any, name: string }> };

export type GetPartReservationsQueryVariables = Exact<{
  partId: Scalars['UUID']['input'];
  pageNumber: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
}>;


export type GetPartReservationsQuery = { __typename?: 'Query', partReservations: { __typename?: 'PaginatedListOfPartReservationDto', pageNumber: number, pageSize: number, totalCount: number, totalPages: number, items: Array<{ __typename?: 'PartReservationDto', id: any, partId: any, quantityRequested: number, quantityReserved: number, status: ReservationStatus, repair?: { __typename?: 'RepairDto', id: any, ticketNumber: string, deviceInfo: { __typename?: 'DeviceInfoDto', manufacturer: string, model: string } } | null }> } };

export type GetPartsQueryVariables = Exact<{
  pageNumber: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  filter: PartFilterInput;
}>;


export type GetPartsQuery = { __typename?: 'Query', parts: { __typename?: 'PaginatedListOfPartDto', pageNumber: number, pageSize: number, totalCount: number, totalPages: number, items: Array<{ __typename?: 'PartDto', id: any, name: string, stock: number, stockLevel: StockLevel, price: any, category?: { __typename?: 'PartCategoryDto', id: any, name: string } | null }> } };

export type GetRepairQueryVariables = Exact<{
  repairId: Scalars['UUID']['input'];
}>;


export type GetRepairQuery = { __typename?: 'Query', repair: { __typename?: 'RepairDto', id: any, ticketNumber: string, conversationId?: any | null, status: RepairStatus, additionalComment?: string | null, repairShop?: { __typename?: 'RepairShopDto', id: any, name: string } | null, contactInfo: { __typename?: 'ContactInfoDto', fullName: string, email: string, phoneNumber: string, preferredContactMethod: ContactMethod }, deviceInfo: { __typename?: 'DeviceInfoDto', deviceType: DeviceType, manufacturer: string, model: string, serialNumber: string }, faultInfo: { __typename?: 'FaultInfoDto', whenOccurred: string, howToReproduce: string, description: string, previouslyRepaired: boolean }, returnInfo: { __typename?: 'ReturnInfoDto', returnMethod: ReturnMethod, returnAddress?: { __typename?: 'AddressDto', recipientName: string, street: string, buildingNumber: string, apartmentNumber?: string | null, city: string, postalCode: string, country: Country } | null } } };

export type GetRepairHistoryQueryVariables = Exact<{
  repairId: Scalars['UUID']['input'];
}>;


export type GetRepairHistoryQuery = { __typename?: 'Query', repair: { __typename?: 'RepairDto', id: any, repairHistory: Array<
      | { __typename?: 'NormalRepairStepDto', id: any, status: RepairStatus, createdAt: any, description?: string | null }
      | { __typename?: 'PaymentRepairStepDto', amount: string, paid: boolean, id: any, status: RepairStatus, createdAt: any, description?: string | null }
      | { __typename?: 'QuoteRepairStepDto', id: any, status: RepairStatus, createdAt: any, description?: string | null, quote: { __typename?: 'QuoteDto', laborCost: string, partsCost: string, totalCost: string, quoteAccepted?: boolean | null } }
    > } };

export type GetRepairImagesQueryVariables = Exact<{
  repairId: Scalars['UUID']['input'];
}>;


export type GetRepairImagesQuery = { __typename?: 'Query', repair: { __typename?: 'RepairDto', id: any, images: Array<{ __typename?: 'ImageDto', id: any, small: string, medium: string, large: string, extraLarge: string }> } };

export type GetRepairNotesQueryVariables = Exact<{
  repairId: Scalars['UUID']['input'];
}>;


export type GetRepairNotesQuery = { __typename?: 'Query', repairNotes: Array<{ __typename?: 'RepairNoteDto', id: any, content: string, createdAt: any, worker?: { __typename?: 'WorkerDto', id: any, firstName: string, lastName: string } | null }> };

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
  filter: RepairFilterInput;
  sortBy?: InputMaybe<RepairSortField>;
  sortDirection?: InputMaybe<SortDirection>;
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
}>;


export type ApproveQuoteMutation = { __typename?: 'Mutation', repairActions: { __typename?: 'RepairActions', approveQuote: boolean } };

export type CheckInAndQueueMutationVariables = Exact<{
  repairId: Scalars['UUID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type CheckInAndQueueMutation = { __typename?: 'Mutation', repairActions: { __typename?: 'RepairActions', checkInAndQueue: boolean } };

export type CompleteRepairFailureMutationVariables = Exact<{
  repairId: Scalars['UUID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type CompleteRepairFailureMutation = { __typename?: 'Mutation', repairActions: { __typename?: 'RepairActions', completeRepairFailure: boolean } };

export type CompleteRepairSuccessMutationVariables = Exact<{
  repairId: Scalars['UUID']['input'];
  finalCostCurrency?: InputMaybe<CurrencyCode>;
  finalCost?: InputMaybe<Scalars['Decimal']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type CompleteRepairSuccessMutation = { __typename?: 'Mutation', repairActions: { __typename?: 'RepairActions', completeRepairSuccess: boolean } };

export type DeclareUnfixableMutationVariables = Exact<{
  repairId: Scalars['UUID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type DeclareUnfixableMutation = { __typename?: 'Mutation', repairActions: { __typename?: 'RepairActions', declareUnfixable: boolean } };

export type FinalizeDeliveryMutationVariables = Exact<{
  repairId: Scalars['UUID']['input'];
}>;


export type FinalizeDeliveryMutation = { __typename?: 'Mutation', repairActions: { __typename?: 'RepairActions', finalizeDelivery: boolean } };

export type PartsArrivedMutationVariables = Exact<{
  repairId: Scalars['UUID']['input'];
}>;


export type PartsArrivedMutation = { __typename?: 'Mutation', repairActions: { __typename?: 'RepairActions', partsArrived: boolean } };

export type PartsNeededMutationVariables = Exact<{
  repairId: Scalars['UUID']['input'];
}>;


export type PartsNeededMutation = { __typename?: 'Mutation', repairActions: { __typename?: 'RepairActions', partsNeeded: boolean } };

export type PaymentCompletedMutationVariables = Exact<{
  repairId: Scalars['UUID']['input'];
}>;


export type PaymentCompletedMutation = { __typename?: 'Mutation', repairActions: { __typename?: 'RepairActions', paymentCompleted: boolean } };

export type PickupMutationVariables = Exact<{
  repairId: Scalars['UUID']['input'];
}>;


export type PickupMutation = { __typename?: 'Mutation', repairActions: { __typename?: 'RepairActions', pickup: boolean } };

export type RejectQuoteMutationVariables = Exact<{
  repairId: Scalars['UUID']['input'];
}>;


export type RejectQuoteMutation = { __typename?: 'Mutation', repairActions: { __typename?: 'RepairActions', rejectQuote: boolean } };

export type ReportComplaintMutationVariables = Exact<{
  repairId: Scalars['UUID']['input'];
}>;


export type ReportComplaintMutation = { __typename?: 'Mutation', repairActions: { __typename?: 'RepairActions', reportComplaint: boolean } };

export type ResolveComplaintMutationVariables = Exact<{
  repairId: Scalars['UUID']['input'];
}>;


export type ResolveComplaintMutation = { __typename?: 'Mutation', repairActions: { __typename?: 'RepairActions', resolveComplaint: boolean } };

export type ShipMutationVariables = Exact<{
  repairId: Scalars['UUID']['input'];
}>;


export type ShipMutation = { __typename?: 'Mutation', repairActions: { __typename?: 'RepairActions', ship: boolean } };

export type StartDiagnosisMutationVariables = Exact<{
  repairId: Scalars['UUID']['input'];
}>;


export type StartDiagnosisMutation = { __typename?: 'Mutation', repairActions: { __typename?: 'RepairActions', startDiagnosis: boolean } };

export type StartRepairMutationVariables = Exact<{
  repairId: Scalars['UUID']['input'];
}>;


export type StartRepairMutation = { __typename?: 'Mutation', repairActions: { __typename?: 'RepairActions', startRepair: boolean } };

export type SubmitQuoteMutationVariables = Exact<{
  repairId: Scalars['UUID']['input'];
  currency: CurrencyCode;
  laborCost: Scalars['Decimal']['input'];
  partsCost: Scalars['Decimal']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type SubmitQuoteMutation = { __typename?: 'Mutation', repairActions: { __typename?: 'RepairActions', submitQuote: boolean } };

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

export type UnassignMutationVariables = Exact<{
  repairId: Scalars['UUID']['input'];
}>;


export type UnassignMutation = { __typename?: 'Mutation', unassignWorker: boolean };

export type UploadRepairImageMutationVariables = Exact<{
  repairId: Scalars['UUID']['input'];
  contentType: Scalars['String']['input'];
}>;


export type UploadRepairImageMutation = { __typename?: 'Mutation', uploadRepairImage: string };


export const AddPartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddPart"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddPartRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addPart"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}]}]}}]} as unknown as DocumentNode<AddPartMutation, AddPartMutationVariables>;
export const AddPartCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddPartCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addPartCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}]}}]} as unknown as DocumentNode<AddPartCategoryMutation, AddPartCategoryMutationVariables>;
export const AddRepairNoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddRepairNote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addRepairNote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"repairId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}]}}]}]}}]} as unknown as DocumentNode<AddRepairNoteMutation, AddRepairNoteMutationVariables>;
export const AddReviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddReview"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repairShopId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"rating"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"comment"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addReview"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"repairShopId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairShopId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"rating"},"value":{"kind":"Variable","name":{"kind":"Name","value":"rating"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"comment"},"value":{"kind":"Variable","name":{"kind":"Name","value":"comment"}}}]}}]}]}}]} as unknown as DocumentNode<AddReviewMutation, AddReviewMutationVariables>;
export const AdjustStockDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdjustStock"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"partId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newStock"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adjustStock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"partId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"partId"}}},{"kind":"Argument","name":{"kind":"Name","value":"newStock"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newStock"}}}]}]}}]} as unknown as DocumentNode<AdjustStockMutation, AdjustStockMutationVariables>;
export const AssignYourselfDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AssignYourself"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assignWorker"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"repairId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}}}]}]}}]} as unknown as DocumentNode<AssignYourselfMutation, AssignYourselfMutationVariables>;
export const AuthContextDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AuthContext"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FullCustomerDto"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"phoneRegionCode"}},{"kind":"Field","name":{"kind":"Name","value":"preferredContactMethod"}},{"kind":"Field","name":{"kind":"Name","value":"preferredReturnMethod"}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipientName"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"buildingNumber"}},{"kind":"Field","name":{"kind":"Name","value":"apartmentNumber"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isBusiness"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FullWorkerDto"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"repairShop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AuthContextQuery, AuthContextQueryVariables>;
export const BookRepairDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"BookRepair"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BookRepairRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookRepair"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ticketNumber"}},{"kind":"Field","name":{"kind":"Name","value":"repairDocument"}},{"kind":"Field","name":{"kind":"Name","value":"repairShop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipientName"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"buildingNumber"}},{"kind":"Field","name":{"kind":"Name","value":"apartmentNumber"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<BookRepairMutation, BookRepairMutationVariables>;
export const ChangeAddressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeAddress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChangeAddressRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeAddress"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}]}]}}]} as unknown as DocumentNode<ChangeAddressMutation, ChangeAddressMutationVariables>;
export const ChangeEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newEmail"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"newEmail"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newEmail"}}}]}}]}]}}]} as unknown as DocumentNode<ChangeEmailMutation, ChangeEmailMutationVariables>;
export const ChangePasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangePassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"currentPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changePassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"currentPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"currentPassword"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"newPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}}}]}}]}]}}]} as unknown as DocumentNode<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ChangePhoneNumberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangePhoneNumber"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPhoneNumber"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"regionCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changePhoneNumber"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"newPhoneNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPhoneNumber"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"regionCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"regionCode"}}}]}}]}]}}]} as unknown as DocumentNode<ChangePhoneNumberMutation, ChangePhoneNumberMutationVariables>;
export const ChangePreferredContactDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangePreferredContact"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contactMethod"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ContactMethod"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changePreferredContact"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"contactMethod"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contactMethod"}}}]}]}}]} as unknown as DocumentNode<ChangePreferredContactMutation, ChangePreferredContactMutationVariables>;
export const ChangePreferredReturnDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangePreferredReturn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"returnMethod"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ReturnMethod"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changePreferredReturn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"returnMethod"},"value":{"kind":"Variable","name":{"kind":"Name","value":"returnMethod"}}}]}]}}]} as unknown as DocumentNode<ChangePreferredReturnMutation, ChangePreferredReturnMutationVariables>;
export const ChangeReorderFlagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeReorderFlag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"partId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeReorderFlag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"partId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"partId"}}}]}]}}]} as unknown as DocumentNode<ChangeReorderFlagMutation, ChangeReorderFlagMutationVariables>;
export const ConversationExistsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ConversationExists"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repairShopId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"customerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"conversationByParticipants"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"repairShopId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairShopId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"customerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"customerId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ConversationExistsQuery, ConversationExistsQueryVariables>;
export const ConversationSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"ConversationSubscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"conversationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"actingRole"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ActingRole"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onMessageSent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"conversationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"conversationId"}}},{"kind":"Argument","name":{"kind":"Name","value":"actingRole"},"value":{"kind":"Variable","name":{"kind":"Name","value":"actingRole"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"senderRole"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<ConversationSubscriptionSubscription, ConversationSubscriptionSubscriptionVariables>;
export const CreateConversationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateConversation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"receiverId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstMessage"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createConversation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"receiverId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"receiverId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"firstMessage"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstMessage"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateConversationMutation, CreateConversationMutationVariables>;
export const CustomerConvListSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"CustomerConvListSubscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onCustomerConversationsUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"numberOfMessages"},"value":{"kind":"IntValue","value":"1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"senderRole"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CustomerConvListSubscriptionSubscription, CustomerConvListSubscriptionSubscriptionVariables>;
export const DeletePartCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePartCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"partCategoryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePartCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"partCategoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"partCategoryId"}}}]}]}}]} as unknown as DocumentNode<DeletePartCategoryMutation, DeletePartCategoryMutationVariables>;
export const DeleteRepairImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteRepairImage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"imageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteRepairImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"imageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"imageId"}}}]}]}}]} as unknown as DocumentNode<DeleteRepairImageMutation, DeleteRepairImageMutationVariables>;
export const DeleteRepairNoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteRepairNote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repairNoteId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteRepairNote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"repairNoteId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairNoteId"}}}]}]}}]} as unknown as DocumentNode<DeleteRepairNoteMutation, DeleteRepairNoteMutationVariables>;
export const EditPartCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EditPartCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"partCategoryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editPartCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"partCategoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"partCategoryId"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}]}}]} as unknown as DocumentNode<EditPartCategoryMutation, EditPartCategoryMutationVariables>;
export const GetAssignedTechnicianDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAssignedTechnician"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repair"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"repairId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assignedWorker"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]} as unknown as DocumentNode<GetAssignedTechnicianQuery, GetAssignedTechnicianQueryVariables>;
export const GetConversationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetConversation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"conversationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"numberOfMessages"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastMessageId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"conversation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"conversationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"conversationId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"numberOfMessages"},"value":{"kind":"Variable","name":{"kind":"Name","value":"numberOfMessages"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"lastMessageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastMessageId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"senderRole"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lastItemId"}},{"kind":"Field","name":{"kind":"Name","value":"hasMore"}}]}},{"kind":"Field","name":{"kind":"Name","value":"conversationType"}},{"kind":"Field","name":{"kind":"Name","value":"repair"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ticketNumber"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"deviceInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"manufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"model"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"repairShop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"reviewCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetConversationQuery, GetConversationQueryVariables>;
export const GetMoreMessagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMoreMessages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"conversationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"numberOfMessages"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastMessageId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"conversation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"conversationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"conversationId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"numberOfMessages"},"value":{"kind":"Variable","name":{"kind":"Name","value":"numberOfMessages"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"lastMessageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastMessageId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"senderRole"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lastItemId"}},{"kind":"Field","name":{"kind":"Name","value":"hasMore"}}]}}]}}]}}]} as unknown as DocumentNode<GetMoreMessagesQuery, GetMoreMessagesQueryVariables>;
export const GetConversationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetConversations"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"numberOfConversations"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastConversationId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FullCustomerDto"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"conversations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"numberOfConversations"},"value":{"kind":"Variable","name":{"kind":"Name","value":"numberOfConversations"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"lastConversationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastConversationId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"conversationType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"repairShop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"repair"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deviceInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"manufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"model"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"numberOfMessages"},"value":{"kind":"IntValue","value":"1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"senderRole"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"hasMore"}},{"kind":"Field","name":{"kind":"Name","value":"lastItemId"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FullWorkerDto"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"repairShop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"conversations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"numberOfConversations"},"value":{"kind":"Variable","name":{"kind":"Name","value":"numberOfConversations"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"lastConversationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastConversationId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"conversationType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"repair"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deviceInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"manufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"model"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"numberOfMessages"},"value":{"kind":"IntValue","value":"1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"senderRole"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"hasMore"}},{"kind":"Field","name":{"kind":"Name","value":"lastItemId"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetConversationsQuery, GetConversationsQueryVariables>;
export const GetCustomerRepairsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCustomerRepairs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FullCustomerDto"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"repairs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pageNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ticketNumber"}},{"kind":"Field","name":{"kind":"Name","value":"deviceInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"manufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"model"}}]}},{"kind":"Field","name":{"kind":"Name","value":"faultInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageNumber"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetCustomerRepairsQuery, GetCustomerRepairsQueryVariables>;
export const GetDashboardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDashboard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repairShopId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"awaitingDiagnosis"},"name":{"kind":"Name","value":"repairCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"repairShopId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairShopId"}}},{"kind":"Argument","name":{"kind":"Name","value":"repairStatus"},"value":{"kind":"EnumValue","value":"AWAITING_DIAGNOSIS"}}]},{"kind":"Field","alias":{"kind":"Name","value":"awaitingRepair"},"name":{"kind":"Name","value":"repairCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"repairShopId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairShopId"}}},{"kind":"Argument","name":{"kind":"Name","value":"repairStatus"},"value":{"kind":"EnumValue","value":"AWAITING_REPAIR"}}]},{"kind":"Field","alias":{"kind":"Name","value":"awaitingShipping"},"name":{"kind":"Name","value":"repairCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"repairShopId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairShopId"}}},{"kind":"Argument","name":{"kind":"Name","value":"repairStatus"},"value":{"kind":"EnumValue","value":"AWAITING_SHIPPING"}}]},{"kind":"Field","alias":{"kind":"Name","value":"readyForPickup"},"name":{"kind":"Name","value":"repairCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"repairShopId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairShopId"}}},{"kind":"Argument","name":{"kind":"Name","value":"repairStatus"},"value":{"kind":"EnumValue","value":"READY_FOR_PICKUP"}}]},{"kind":"Field","alias":{"kind":"Name","value":"complaint"},"name":{"kind":"Name","value":"repairCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"repairShopId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairShopId"}}},{"kind":"Argument","name":{"kind":"Name","value":"repairStatus"},"value":{"kind":"EnumValue","value":"COMPLAINT"}}]},{"kind":"Field","alias":{"kind":"Name","value":"activeRepair"},"name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FullWorkerDto"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"activeRepair"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ticketNumber"}},{"kind":"Field","name":{"kind":"Name","value":"deviceInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"manufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"model"}}]}},{"kind":"Field","name":{"kind":"Name","value":"faultInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"conversations"},"name":{"kind":"Name","value":"repairShop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"repairShopId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairShopId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"conversations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"numberOfConversations"},"value":{"kind":"IntValue","value":"3"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"conversationType"}},{"kind":"Field","name":{"kind":"Name","value":"repair"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"deviceInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"manufacturer"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"numberOfMessages"},"value":{"kind":"IntValue","value":"1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetDashboardQuery, GetDashboardQueryVariables>;
export const GetNeededPartsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetNeededParts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"partsNeeded"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"repairId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"partId"}},{"kind":"Field","name":{"kind":"Name","value":"part"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"stock"}},{"kind":"Field","name":{"kind":"Name","value":"stockLevel"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageNumber"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]} as unknown as DocumentNode<GetNeededPartsQuery, GetNeededPartsQueryVariables>;
export const GetPartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPart"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"partId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"part"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"partId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"partId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"manufacturerCode"}},{"kind":"Field","name":{"kind":"Name","value":"needsReorder"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"stock"}},{"kind":"Field","name":{"kind":"Name","value":"stockLevel"}},{"kind":"Field","name":{"kind":"Name","value":"lowStockThreshold"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]} as unknown as DocumentNode<GetPartQuery, GetPartQueryVariables>;
export const GetPartCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPartCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"partCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetPartCategoriesQuery, GetPartCategoriesQueryVariables>;
export const GetPartReservationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPartReservations"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"partId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"partReservations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"partId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"partId"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"partId"}},{"kind":"Field","name":{"kind":"Name","value":"repair"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ticketNumber"}},{"kind":"Field","name":{"kind":"Name","value":"deviceInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"manufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"model"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantityRequested"}},{"kind":"Field","name":{"kind":"Name","value":"quantityReserved"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageNumber"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]} as unknown as DocumentNode<GetPartReservationsQuery, GetPartReservationsQueryVariables>;
export const GetPartsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetParts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PartFilterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"parts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pageNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"stock"}},{"kind":"Field","name":{"kind":"Name","value":"stockLevel"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageNumber"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]} as unknown as DocumentNode<GetPartsQuery, GetPartsQueryVariables>;
export const GetRepairDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRepair"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repair"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"repairId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ticketNumber"}},{"kind":"Field","name":{"kind":"Name","value":"conversationId"}},{"kind":"Field","name":{"kind":"Name","value":"repairShop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"contactInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"preferredContactMethod"}}]}},{"kind":"Field","name":{"kind":"Name","value":"deviceInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deviceType"}},{"kind":"Field","name":{"kind":"Name","value":"manufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"serialNumber"}}]}},{"kind":"Field","name":{"kind":"Name","value":"faultInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"whenOccurred"}},{"kind":"Field","name":{"kind":"Name","value":"howToReproduce"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"previouslyRepaired"}}]}},{"kind":"Field","name":{"kind":"Name","value":"returnInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returnMethod"}},{"kind":"Field","name":{"kind":"Name","value":"returnAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipientName"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"buildingNumber"}},{"kind":"Field","name":{"kind":"Name","value":"apartmentNumber"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"country"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"additionalComment"}}]}}]}}]} as unknown as DocumentNode<GetRepairQuery, GetRepairQueryVariables>;
export const GetRepairHistoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRepairHistory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repair"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"repairId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"repairHistory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PaymentRepairStepDto"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"paid"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QuoteRepairStepDto"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"quote"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"laborCost"}},{"kind":"Field","name":{"kind":"Name","value":"partsCost"}},{"kind":"Field","name":{"kind":"Name","value":"totalCost"}},{"kind":"Field","name":{"kind":"Name","value":"quoteAccepted"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetRepairHistoryQuery, GetRepairHistoryQueryVariables>;
export const GetRepairImagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRepairImages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repair"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"repairId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"small"}},{"kind":"Field","name":{"kind":"Name","value":"medium"}},{"kind":"Field","name":{"kind":"Name","value":"large"}},{"kind":"Field","name":{"kind":"Name","value":"extraLarge"}}]}}]}}]}}]} as unknown as DocumentNode<GetRepairImagesQuery, GetRepairImagesQueryVariables>;
export const GetRepairNotesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRepairNotes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repairNotes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"repairId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"worker"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetRepairNotesQuery, GetRepairNotesQueryVariables>;
export const GetRepairShopDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRepairShop"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repairShopId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repairShop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"repairShopId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairShopId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mainImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"extraLarge"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"timeZoneId"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"reviewCount"}},{"kind":"Field","name":{"kind":"Name","value":"aboutUs"}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"buildingNumber"}},{"kind":"Field","name":{"kind":"Name","value":"apartmentNumber"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"city"}}]}},{"kind":"Field","name":{"kind":"Name","value":"openingHours"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"monday"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tuesday"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wednesday"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}}]}},{"kind":"Field","name":{"kind":"Name","value":"thursday"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}}]}},{"kind":"Field","name":{"kind":"Name","value":"friday"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}}]}},{"kind":"Field","name":{"kind":"Name","value":"saturday"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sunday"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetRepairShopQuery, GetRepairShopQueryVariables>;
export const GetRepairShopForNewConvDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRepairShopForNewConv"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repairShopId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repairShop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"repairShopId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairShopId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"reviewCount"}}]}}]}}]} as unknown as DocumentNode<GetRepairShopForNewConvQuery, GetRepairShopForNewConvQueryVariables>;
export const GetRepairShopRepairsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRepairShopRepairs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repairShopId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RepairFilterInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"RepairSortField"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortDirection"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortDirection"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repairShop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"repairShopId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairShopId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"repairs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pageNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"sortBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortBy"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"sortDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortDirection"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ticketNumber"}},{"kind":"Field","name":{"kind":"Name","value":"contactInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"deviceInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"manufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"model"}}]}},{"kind":"Field","name":{"kind":"Name","value":"faultInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assignedWorker"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageNumber"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]}}]} as unknown as DocumentNode<GetRepairShopRepairsQuery, GetRepairShopRepairsQueryVariables>;
export const ReviewsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Reviews"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repairShopId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reviews"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"repairShopId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairShopId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"pageNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageNumber"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]} as unknown as DocumentNode<ReviewsQuery, ReviewsQueryVariables>;
export const ServicesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Services"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repairShopId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"services"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"repairShopId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairShopId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"pageNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageNumber"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]} as unknown as DocumentNode<ServicesQuery, ServicesQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"rememberMe"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"rememberMe"},"value":{"kind":"Variable","name":{"kind":"Name","value":"rememberMe"}}}]}}]}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isBusiness"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taxIdNumber"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"isBusiness"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isBusiness"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"firstName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"lastName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"companyName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyName"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"taxIdNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taxIdNumber"}}}]}}]}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const RemoveAddressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeAddress"}}]}}]} as unknown as DocumentNode<RemoveAddressMutation, RemoveAddressMutationVariables>;
export const RemovePhoneNumberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemovePhoneNumber"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removePhoneNumber"}}]}}]} as unknown as DocumentNode<RemovePhoneNumberMutation, RemovePhoneNumberMutationVariables>;
export const ApproveQuoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ApproveQuote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repairActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"approveQuote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"repairId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}}}]}]}}]}}]} as unknown as DocumentNode<ApproveQuoteMutation, ApproveQuoteMutationVariables>;
export const CheckInAndQueueDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CheckInAndQueue"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repairActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checkInAndQueue"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"repairId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}}]}}]}]}}]}}]} as unknown as DocumentNode<CheckInAndQueueMutation, CheckInAndQueueMutationVariables>;
export const CompleteRepairFailureDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CompleteRepairFailure"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repairActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completeRepairFailure"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"repairId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}}]}}]}]}}]}}]} as unknown as DocumentNode<CompleteRepairFailureMutation, CompleteRepairFailureMutationVariables>;
export const CompleteRepairSuccessDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CompleteRepairSuccess"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"finalCostCurrency"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CurrencyCode"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"finalCost"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Decimal"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repairActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completeRepairSuccess"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"repairId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"finalCostCurrency"},"value":{"kind":"Variable","name":{"kind":"Name","value":"finalCostCurrency"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"finalCost"},"value":{"kind":"Variable","name":{"kind":"Name","value":"finalCost"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}}]}}]}]}}]}}]} as unknown as DocumentNode<CompleteRepairSuccessMutation, CompleteRepairSuccessMutationVariables>;
export const DeclareUnfixableDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeclareUnfixable"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repairActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"declareUnfixable"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"repairId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}}]}}]}]}}]}}]} as unknown as DocumentNode<DeclareUnfixableMutation, DeclareUnfixableMutationVariables>;
export const FinalizeDeliveryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"FinalizeDelivery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repairActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"finalizeDelivery"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"repairId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}}}]}]}}]}}]} as unknown as DocumentNode<FinalizeDeliveryMutation, FinalizeDeliveryMutationVariables>;
export const PartsArrivedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PartsArrived"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repairActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"partsArrived"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"repairId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}}}]}]}}]}}]} as unknown as DocumentNode<PartsArrivedMutation, PartsArrivedMutationVariables>;
export const PartsNeededDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PartsNeeded"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repairActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"partsNeeded"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"repairId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}}}]}]}}]}}]} as unknown as DocumentNode<PartsNeededMutation, PartsNeededMutationVariables>;
export const PaymentCompletedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PaymentCompleted"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repairActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paymentCompleted"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"repairId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}}}]}]}}]}}]} as unknown as DocumentNode<PaymentCompletedMutation, PaymentCompletedMutationVariables>;
export const PickupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Pickup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repairActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pickup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"repairId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}}}]}]}}]}}]} as unknown as DocumentNode<PickupMutation, PickupMutationVariables>;
export const RejectQuoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RejectQuote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repairActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rejectQuote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"repairId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}}}]}]}}]}}]} as unknown as DocumentNode<RejectQuoteMutation, RejectQuoteMutationVariables>;
export const ReportComplaintDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ReportComplaint"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repairActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reportComplaint"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"repairId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}}}]}]}}]}}]} as unknown as DocumentNode<ReportComplaintMutation, ReportComplaintMutationVariables>;
export const ResolveComplaintDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResolveComplaint"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repairActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resolveComplaint"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"repairId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}}}]}]}}]}}]} as unknown as DocumentNode<ResolveComplaintMutation, ResolveComplaintMutationVariables>;
export const ShipDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Ship"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repairActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ship"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"repairId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}}}]}]}}]}}]} as unknown as DocumentNode<ShipMutation, ShipMutationVariables>;
export const StartDiagnosisDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"StartDiagnosis"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repairActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startDiagnosis"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"repairId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}}}]}]}}]}}]} as unknown as DocumentNode<StartDiagnosisMutation, StartDiagnosisMutationVariables>;
export const StartRepairDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"StartRepair"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repairActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startRepair"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"repairId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}}}]}]}}]}}]} as unknown as DocumentNode<StartRepairMutation, StartRepairMutationVariables>;
export const SubmitQuoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SubmitQuote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"currency"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CurrencyCode"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"laborCost"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Decimal"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"partsCost"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Decimal"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repairActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"submitQuote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"repairId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"currency"},"value":{"kind":"Variable","name":{"kind":"Name","value":"currency"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"laborCost"},"value":{"kind":"Variable","name":{"kind":"Name","value":"laborCost"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"partsCost"},"value":{"kind":"Variable","name":{"kind":"Name","value":"partsCost"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}}]}}]}]}}]}}]} as unknown as DocumentNode<SubmitQuoteMutation, SubmitQuoteMutationVariables>;
export const RepairShopConvListSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"RepairShopConvListSubscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repairShopId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onRepairShopConversationsUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"repairShopId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairShopId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"numberOfMessages"},"value":{"kind":"IntValue","value":"1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"senderRole"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RepairShopConvListSubscriptionSubscription, RepairShopConvListSubscriptionSubscriptionVariables>;
export const SearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Search"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchShopsByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"pageNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"miniatureImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"small"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"timeZoneId"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"reviewCount"}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"buildingNumber"}},{"kind":"Field","name":{"kind":"Name","value":"apartmentNumber"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"city"}}]}},{"kind":"Field","name":{"kind":"Name","value":"openingHours"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"monday"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tuesday"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wednesday"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}}]}},{"kind":"Field","name":{"kind":"Name","value":"thursday"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}}]}},{"kind":"Field","name":{"kind":"Name","value":"friday"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}}]}},{"kind":"Field","name":{"kind":"Name","value":"saturday"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sunday"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageNumber"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]} as unknown as DocumentNode<SearchQuery, SearchQueryVariables>;
export const SendMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"conversationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"message"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"conversationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"conversationId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"message"}}}]}}]}]}}]} as unknown as DocumentNode<SendMessageMutation, SendMessageMutationVariables>;
export const UnassignDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Unassign"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unassignWorker"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"repairId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}}}]}]}}]} as unknown as DocumentNode<UnassignMutation, UnassignMutationVariables>;
export const UploadRepairImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UploadRepairImage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contentType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"uploadRepairImage"},"name":{"kind":"Name","value":"addRepairImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"repairId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairId"}}},{"kind":"Argument","name":{"kind":"Name","value":"contentType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contentType"}}}]}]}}]} as unknown as DocumentNode<UploadRepairImageMutation, UploadRepairImageMutationVariables>;