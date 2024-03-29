import { ID } from 'Time:string';
import { String } from 'Time:string';
import { Boolean } from 'Time:string';
import { Int } from 'Time:string';
import { Float } from 'Time:string';
import { Cursor } from 'Time:string';
import { Time } from 'Time:string';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: ID;
  String: String;
  Boolean: Boolean;
  Int: Int;
  Float: Float;
  /**
   * Define a Relay Cursor type:
   * https://relay.dev/graphql/connections.htm#sec-Cursor
   */
  Cursor: Cursor;
  /** The builtin Time type */
  Time: Time;
};

export type Block = Node & {
  __typename?: 'Block';
  authorID: Scalars['String'];
  duration: Scalars['Int'];
  id: Scalars['ID'];
  part: Part;
  partID: Scalars['ID'];
  pitch: Scalars['Int'];
  speaker: Scalars['String'];
  speed: Scalars['Float'];
  texts: Scalars['String'];
  volume: Scalars['Float'];
};

/**
 * BlockWhereInput is used for filtering Block objects.
 * Input was generated by ent.
 */
export type BlockWhereInput = {
  and?: InputMaybe<Array<BlockWhereInput>>;
  /** author_id field predicates */
  authorID?: InputMaybe<Scalars['String']>;
  authorIDContains?: InputMaybe<Scalars['String']>;
  authorIDContainsFold?: InputMaybe<Scalars['String']>;
  authorIDEqualFold?: InputMaybe<Scalars['String']>;
  authorIDGT?: InputMaybe<Scalars['String']>;
  authorIDGTE?: InputMaybe<Scalars['String']>;
  authorIDHasPrefix?: InputMaybe<Scalars['String']>;
  authorIDHasSuffix?: InputMaybe<Scalars['String']>;
  authorIDIn?: InputMaybe<Array<Scalars['String']>>;
  authorIDLT?: InputMaybe<Scalars['String']>;
  authorIDLTE?: InputMaybe<Scalars['String']>;
  authorIDNEQ?: InputMaybe<Scalars['String']>;
  authorIDNotIn?: InputMaybe<Array<Scalars['String']>>;
  /** duration field predicates */
  duration?: InputMaybe<Scalars['Int']>;
  durationGT?: InputMaybe<Scalars['Int']>;
  durationGTE?: InputMaybe<Scalars['Int']>;
  durationIn?: InputMaybe<Array<Scalars['Int']>>;
  durationLT?: InputMaybe<Scalars['Int']>;
  durationLTE?: InputMaybe<Scalars['Int']>;
  durationNEQ?: InputMaybe<Scalars['Int']>;
  durationNotIn?: InputMaybe<Array<Scalars['Int']>>;
  /** part edge predicates */
  hasPart?: InputMaybe<Scalars['Boolean']>;
  hasPartWith?: InputMaybe<Array<PartWhereInput>>;
  /** id field predicates */
  id?: InputMaybe<Scalars['ID']>;
  idContainsFold?: InputMaybe<Scalars['ID']>;
  idEqualFold?: InputMaybe<Scalars['ID']>;
  idGT?: InputMaybe<Scalars['ID']>;
  idGTE?: InputMaybe<Scalars['ID']>;
  idIn?: InputMaybe<Array<Scalars['ID']>>;
  idLT?: InputMaybe<Scalars['ID']>;
  idLTE?: InputMaybe<Scalars['ID']>;
  idNEQ?: InputMaybe<Scalars['ID']>;
  idNotIn?: InputMaybe<Array<Scalars['ID']>>;
  not?: InputMaybe<BlockWhereInput>;
  or?: InputMaybe<Array<BlockWhereInput>>;
  /** part_id field predicates */
  partID?: InputMaybe<Scalars['ID']>;
  partIDContains?: InputMaybe<Scalars['ID']>;
  partIDContainsFold?: InputMaybe<Scalars['ID']>;
  partIDEqualFold?: InputMaybe<Scalars['ID']>;
  partIDGT?: InputMaybe<Scalars['ID']>;
  partIDGTE?: InputMaybe<Scalars['ID']>;
  partIDHasPrefix?: InputMaybe<Scalars['ID']>;
  partIDHasSuffix?: InputMaybe<Scalars['ID']>;
  partIDIn?: InputMaybe<Array<Scalars['ID']>>;
  partIDLT?: InputMaybe<Scalars['ID']>;
  partIDLTE?: InputMaybe<Scalars['ID']>;
  partIDNEQ?: InputMaybe<Scalars['ID']>;
  partIDNotIn?: InputMaybe<Array<Scalars['ID']>>;
  /** pitch field predicates */
  pitch?: InputMaybe<Scalars['Int']>;
  pitchGT?: InputMaybe<Scalars['Int']>;
  pitchGTE?: InputMaybe<Scalars['Int']>;
  pitchIn?: InputMaybe<Array<Scalars['Int']>>;
  pitchLT?: InputMaybe<Scalars['Int']>;
  pitchLTE?: InputMaybe<Scalars['Int']>;
  pitchNEQ?: InputMaybe<Scalars['Int']>;
  pitchNotIn?: InputMaybe<Array<Scalars['Int']>>;
  /** speaker field predicates */
  speaker?: InputMaybe<Scalars['String']>;
  speakerContains?: InputMaybe<Scalars['String']>;
  speakerContainsFold?: InputMaybe<Scalars['String']>;
  speakerEqualFold?: InputMaybe<Scalars['String']>;
  speakerGT?: InputMaybe<Scalars['String']>;
  speakerGTE?: InputMaybe<Scalars['String']>;
  speakerHasPrefix?: InputMaybe<Scalars['String']>;
  speakerHasSuffix?: InputMaybe<Scalars['String']>;
  speakerIn?: InputMaybe<Array<Scalars['String']>>;
  speakerLT?: InputMaybe<Scalars['String']>;
  speakerLTE?: InputMaybe<Scalars['String']>;
  speakerNEQ?: InputMaybe<Scalars['String']>;
  speakerNotIn?: InputMaybe<Array<Scalars['String']>>;
  /** speed field predicates */
  speed?: InputMaybe<Scalars['Float']>;
  speedGT?: InputMaybe<Scalars['Float']>;
  speedGTE?: InputMaybe<Scalars['Float']>;
  speedIn?: InputMaybe<Array<Scalars['Float']>>;
  speedLT?: InputMaybe<Scalars['Float']>;
  speedLTE?: InputMaybe<Scalars['Float']>;
  speedNEQ?: InputMaybe<Scalars['Float']>;
  speedNotIn?: InputMaybe<Array<Scalars['Float']>>;
  /** texts field predicates */
  texts?: InputMaybe<Scalars['String']>;
  textsContains?: InputMaybe<Scalars['String']>;
  textsContainsFold?: InputMaybe<Scalars['String']>;
  textsEqualFold?: InputMaybe<Scalars['String']>;
  textsGT?: InputMaybe<Scalars['String']>;
  textsGTE?: InputMaybe<Scalars['String']>;
  textsHasPrefix?: InputMaybe<Scalars['String']>;
  textsHasSuffix?: InputMaybe<Scalars['String']>;
  textsIn?: InputMaybe<Array<Scalars['String']>>;
  textsLT?: InputMaybe<Scalars['String']>;
  textsLTE?: InputMaybe<Scalars['String']>;
  textsNEQ?: InputMaybe<Scalars['String']>;
  textsNotIn?: InputMaybe<Array<Scalars['String']>>;
  /** volume field predicates */
  volume?: InputMaybe<Scalars['Float']>;
  volumeGT?: InputMaybe<Scalars['Float']>;
  volumeGTE?: InputMaybe<Scalars['Float']>;
  volumeIn?: InputMaybe<Array<Scalars['Float']>>;
  volumeLT?: InputMaybe<Scalars['Float']>;
  volumeLTE?: InputMaybe<Scalars['Float']>;
  volumeNEQ?: InputMaybe<Scalars['Float']>;
  volumeNotIn?: InputMaybe<Array<Scalars['Float']>>;
};

/**
 * CreateBlockInput is used for create Block object.
 * Input was generated by ent.
 */
export type CreateBlockInput = {
  authorID?: InputMaybe<Scalars['String']>;
  duration?: InputMaybe<Scalars['Int']>;
  partID: Scalars['ID'];
  pitch?: InputMaybe<Scalars['Int']>;
  speaker?: InputMaybe<Scalars['String']>;
  speed?: InputMaybe<Scalars['Float']>;
  texts?: InputMaybe<Scalars['String']>;
  volume?: InputMaybe<Scalars['Float']>;
};

/**
 * CreatePartInput is used for create Part object.
 * Input was generated by ent.
 */
export type CreatePartInput = {
  authorID: Scalars['String'];
  blockIDs?: InputMaybe<Array<Scalars['ID']>>;
  createdAt?: InputMaybe<Scalars['Time']>;
  name: Scalars['String'];
  workID: Scalars['ID'];
};

/**
 * CreateUserInput is used for create User object.
 * Input was generated by ent.
 */
export type CreateUserInput = {
  point?: InputMaybe<Scalars['Int']>;
  stripeID?: InputMaybe<Scalars['String']>;
  workIDs?: InputMaybe<Array<Scalars['ID']>>;
};

/**
 * CreateWorkInput is used for create Work object.
 * Input was generated by ent.
 */
export type CreateWorkInput = {
  authorID: Scalars['ID'];
  createdAt: Scalars['Time'];
  name: Scalars['String'];
  partIDs?: InputMaybe<Array<Scalars['ID']>>;
  updatedAt: Scalars['Time'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBlock: Block;
  createPart: Part;
  createUser: User;
  createWork: Work;
  deleteBlock?: Maybe<Scalars['Boolean']>;
  deletePart?: Maybe<Scalars['Boolean']>;
  deleteWork?: Maybe<Scalars['Boolean']>;
  updateBlock: Block;
  updatePart: Part;
  updateWork: Work;
};


export type MutationCreateBlockArgs = {
  partId: Scalars['String'];
};


export type MutationCreatePartArgs = {
  workId: Scalars['String'];
};


export type MutationDeleteBlockArgs = {
  blockId: Scalars['ID'];
};


export type MutationDeletePartArgs = {
  partId: Scalars['ID'];
};


export type MutationDeleteWorkArgs = {
  workId: Scalars['ID'];
};


export type MutationUpdateBlockArgs = {
  blockId: Scalars['ID'];
  duration?: InputMaybe<Scalars['Int']>;
  pitch?: InputMaybe<Scalars['Int']>;
  speaker?: InputMaybe<Scalars['String']>;
  speed?: InputMaybe<Scalars['Float']>;
  texts?: InputMaybe<Scalars['String']>;
  volume?: InputMaybe<Scalars['Float']>;
};


export type MutationUpdatePartArgs = {
  name: Scalars['String'];
  partId: Scalars['ID'];
};


export type MutationUpdateWorkArgs = {
  name: Scalars['String'];
  workId: Scalars['ID'];
};

/**
 * An object with an ID.
 * Follows the [Relay Global Object Identification Specification](https://relay.dev/graphql/objectidentification.htm)
 */
export type Node = {
  /** The id of the object. */
  id: Scalars['ID'];
};

/** Possible directions in which to order a list of items when provided an `orderBy` argument. */
export enum OrderDirection {
  /** Specifies an ascending order for a given `orderBy` argument. */
  Asc = 'ASC',
  /** Specifies a descending order for a given `orderBy` argument. */
  Desc = 'DESC'
}

/**
 * Information about pagination in a connection.
 * https://relay.dev/graphql/connections.htm#sec-undefined.PageInfo
 */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']>;
};

export type Part = Node & {
  __typename?: 'Part';
  authorID: Scalars['String'];
  blocks?: Maybe<Array<Block>>;
  createdAt: Scalars['Time'];
  id: Scalars['ID'];
  name: Scalars['String'];
  work: Work;
  workID: Scalars['ID'];
};

/**
 * PartWhereInput is used for filtering Part objects.
 * Input was generated by ent.
 */
export type PartWhereInput = {
  and?: InputMaybe<Array<PartWhereInput>>;
  /** author_id field predicates */
  authorID?: InputMaybe<Scalars['String']>;
  authorIDContains?: InputMaybe<Scalars['String']>;
  authorIDContainsFold?: InputMaybe<Scalars['String']>;
  authorIDEqualFold?: InputMaybe<Scalars['String']>;
  authorIDGT?: InputMaybe<Scalars['String']>;
  authorIDGTE?: InputMaybe<Scalars['String']>;
  authorIDHasPrefix?: InputMaybe<Scalars['String']>;
  authorIDHasSuffix?: InputMaybe<Scalars['String']>;
  authorIDIn?: InputMaybe<Array<Scalars['String']>>;
  authorIDLT?: InputMaybe<Scalars['String']>;
  authorIDLTE?: InputMaybe<Scalars['String']>;
  authorIDNEQ?: InputMaybe<Scalars['String']>;
  authorIDNotIn?: InputMaybe<Array<Scalars['String']>>;
  /** created_at field predicates */
  createdAt?: InputMaybe<Scalars['Time']>;
  createdAtGT?: InputMaybe<Scalars['Time']>;
  createdAtGTE?: InputMaybe<Scalars['Time']>;
  createdAtIn?: InputMaybe<Array<Scalars['Time']>>;
  createdAtLT?: InputMaybe<Scalars['Time']>;
  createdAtLTE?: InputMaybe<Scalars['Time']>;
  createdAtNEQ?: InputMaybe<Scalars['Time']>;
  createdAtNotIn?: InputMaybe<Array<Scalars['Time']>>;
  /** blocks edge predicates */
  hasBlocks?: InputMaybe<Scalars['Boolean']>;
  hasBlocksWith?: InputMaybe<Array<BlockWhereInput>>;
  /** work edge predicates */
  hasWork?: InputMaybe<Scalars['Boolean']>;
  hasWorkWith?: InputMaybe<Array<WorkWhereInput>>;
  /** id field predicates */
  id?: InputMaybe<Scalars['ID']>;
  idContainsFold?: InputMaybe<Scalars['ID']>;
  idEqualFold?: InputMaybe<Scalars['ID']>;
  idGT?: InputMaybe<Scalars['ID']>;
  idGTE?: InputMaybe<Scalars['ID']>;
  idIn?: InputMaybe<Array<Scalars['ID']>>;
  idLT?: InputMaybe<Scalars['ID']>;
  idLTE?: InputMaybe<Scalars['ID']>;
  idNEQ?: InputMaybe<Scalars['ID']>;
  idNotIn?: InputMaybe<Array<Scalars['ID']>>;
  /** name field predicates */
  name?: InputMaybe<Scalars['String']>;
  nameContains?: InputMaybe<Scalars['String']>;
  nameContainsFold?: InputMaybe<Scalars['String']>;
  nameEqualFold?: InputMaybe<Scalars['String']>;
  nameGT?: InputMaybe<Scalars['String']>;
  nameGTE?: InputMaybe<Scalars['String']>;
  nameHasPrefix?: InputMaybe<Scalars['String']>;
  nameHasSuffix?: InputMaybe<Scalars['String']>;
  nameIn?: InputMaybe<Array<Scalars['String']>>;
  nameLT?: InputMaybe<Scalars['String']>;
  nameLTE?: InputMaybe<Scalars['String']>;
  nameNEQ?: InputMaybe<Scalars['String']>;
  nameNotIn?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<PartWhereInput>;
  or?: InputMaybe<Array<PartWhereInput>>;
  /** work_id field predicates */
  workID?: InputMaybe<Scalars['ID']>;
  workIDContains?: InputMaybe<Scalars['ID']>;
  workIDContainsFold?: InputMaybe<Scalars['ID']>;
  workIDEqualFold?: InputMaybe<Scalars['ID']>;
  workIDGT?: InputMaybe<Scalars['ID']>;
  workIDGTE?: InputMaybe<Scalars['ID']>;
  workIDHasPrefix?: InputMaybe<Scalars['ID']>;
  workIDHasSuffix?: InputMaybe<Scalars['ID']>;
  workIDIn?: InputMaybe<Array<Scalars['ID']>>;
  workIDLT?: InputMaybe<Scalars['ID']>;
  workIDLTE?: InputMaybe<Scalars['ID']>;
  workIDNEQ?: InputMaybe<Scalars['ID']>;
  workIDNotIn?: InputMaybe<Array<Scalars['ID']>>;
};

export type Query = {
  __typename?: 'Query';
  blocks: Array<Block>;
  getPartById: Part;
  getUserFromUserId: User;
  getWorkById: Work;
  /** Fetches an object given its ID. */
  node?: Maybe<Node>;
  /** Lookup nodes by a list of IDs. */
  nodes: Array<Maybe<Node>>;
  parts: Array<Part>;
  users: Array<User>;
  works: Array<Work>;
};


export type QueryGetPartByIdArgs = {
  partId: Scalars['ID'];
};


export type QueryGetWorkByIdArgs = {
  workId: Scalars['ID'];
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
};


export type QueryNodesArgs = {
  ids: Array<Scalars['ID']>;
};

/**
 * UpdateBlockInput is used for update Block object.
 * Input was generated by ent.
 */
export type UpdateBlockInput = {
  authorID?: InputMaybe<Scalars['String']>;
  duration?: InputMaybe<Scalars['Int']>;
  partID?: InputMaybe<Scalars['ID']>;
  pitch?: InputMaybe<Scalars['Int']>;
  speaker?: InputMaybe<Scalars['String']>;
  speed?: InputMaybe<Scalars['Float']>;
  texts?: InputMaybe<Scalars['String']>;
  volume?: InputMaybe<Scalars['Float']>;
};

/**
 * UpdatePartInput is used for update Part object.
 * Input was generated by ent.
 */
export type UpdatePartInput = {
  addBlockIDs?: InputMaybe<Array<Scalars['ID']>>;
  authorID?: InputMaybe<Scalars['String']>;
  clearBlocks?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  removeBlockIDs?: InputMaybe<Array<Scalars['ID']>>;
  workID?: InputMaybe<Scalars['ID']>;
};

/**
 * UpdateUserInput is used for update User object.
 * Input was generated by ent.
 */
export type UpdateUserInput = {
  addWorkIDs?: InputMaybe<Array<Scalars['ID']>>;
  clearWorks?: InputMaybe<Scalars['Boolean']>;
  point?: InputMaybe<Scalars['Int']>;
  removeWorkIDs?: InputMaybe<Array<Scalars['ID']>>;
  stripeID?: InputMaybe<Scalars['String']>;
};

/**
 * UpdateWorkInput is used for update Work object.
 * Input was generated by ent.
 */
export type UpdateWorkInput = {
  addPartIDs?: InputMaybe<Array<Scalars['ID']>>;
  authorID?: InputMaybe<Scalars['ID']>;
  clearParts?: InputMaybe<Scalars['Boolean']>;
  createdAt?: InputMaybe<Scalars['Time']>;
  name?: InputMaybe<Scalars['String']>;
  removePartIDs?: InputMaybe<Array<Scalars['ID']>>;
  updatedAt?: InputMaybe<Scalars['Time']>;
};

export type User = Node & {
  __typename?: 'User';
  id: Scalars['ID'];
  point: Scalars['Int'];
  stripeID: Scalars['String'];
  works?: Maybe<Array<Work>>;
};

/**
 * UserWhereInput is used for filtering User objects.
 * Input was generated by ent.
 */
export type UserWhereInput = {
  and?: InputMaybe<Array<UserWhereInput>>;
  /** works edge predicates */
  hasWorks?: InputMaybe<Scalars['Boolean']>;
  hasWorksWith?: InputMaybe<Array<WorkWhereInput>>;
  /** id field predicates */
  id?: InputMaybe<Scalars['ID']>;
  idContainsFold?: InputMaybe<Scalars['ID']>;
  idEqualFold?: InputMaybe<Scalars['ID']>;
  idGT?: InputMaybe<Scalars['ID']>;
  idGTE?: InputMaybe<Scalars['ID']>;
  idIn?: InputMaybe<Array<Scalars['ID']>>;
  idLT?: InputMaybe<Scalars['ID']>;
  idLTE?: InputMaybe<Scalars['ID']>;
  idNEQ?: InputMaybe<Scalars['ID']>;
  idNotIn?: InputMaybe<Array<Scalars['ID']>>;
  not?: InputMaybe<UserWhereInput>;
  or?: InputMaybe<Array<UserWhereInput>>;
  /** point field predicates */
  point?: InputMaybe<Scalars['Int']>;
  pointGT?: InputMaybe<Scalars['Int']>;
  pointGTE?: InputMaybe<Scalars['Int']>;
  pointIn?: InputMaybe<Array<Scalars['Int']>>;
  pointLT?: InputMaybe<Scalars['Int']>;
  pointLTE?: InputMaybe<Scalars['Int']>;
  pointNEQ?: InputMaybe<Scalars['Int']>;
  pointNotIn?: InputMaybe<Array<Scalars['Int']>>;
  /** stripe_id field predicates */
  stripeID?: InputMaybe<Scalars['String']>;
  stripeIDContains?: InputMaybe<Scalars['String']>;
  stripeIDContainsFold?: InputMaybe<Scalars['String']>;
  stripeIDEqualFold?: InputMaybe<Scalars['String']>;
  stripeIDGT?: InputMaybe<Scalars['String']>;
  stripeIDGTE?: InputMaybe<Scalars['String']>;
  stripeIDHasPrefix?: InputMaybe<Scalars['String']>;
  stripeIDHasSuffix?: InputMaybe<Scalars['String']>;
  stripeIDIn?: InputMaybe<Array<Scalars['String']>>;
  stripeIDLT?: InputMaybe<Scalars['String']>;
  stripeIDLTE?: InputMaybe<Scalars['String']>;
  stripeIDNEQ?: InputMaybe<Scalars['String']>;
  stripeIDNotIn?: InputMaybe<Array<Scalars['String']>>;
};

export type Work = Node & {
  __typename?: 'Work';
  author: User;
  authorID: Scalars['ID'];
  createdAt: Scalars['Time'];
  id: Scalars['ID'];
  name: Scalars['String'];
  parts?: Maybe<Array<Part>>;
  updatedAt: Scalars['Time'];
};

/**
 * WorkWhereInput is used for filtering Work objects.
 * Input was generated by ent.
 */
export type WorkWhereInput = {
  and?: InputMaybe<Array<WorkWhereInput>>;
  /** author_id field predicates */
  authorID?: InputMaybe<Scalars['ID']>;
  authorIDContains?: InputMaybe<Scalars['ID']>;
  authorIDContainsFold?: InputMaybe<Scalars['ID']>;
  authorIDEqualFold?: InputMaybe<Scalars['ID']>;
  authorIDGT?: InputMaybe<Scalars['ID']>;
  authorIDGTE?: InputMaybe<Scalars['ID']>;
  authorIDHasPrefix?: InputMaybe<Scalars['ID']>;
  authorIDHasSuffix?: InputMaybe<Scalars['ID']>;
  authorIDIn?: InputMaybe<Array<Scalars['ID']>>;
  authorIDLT?: InputMaybe<Scalars['ID']>;
  authorIDLTE?: InputMaybe<Scalars['ID']>;
  authorIDNEQ?: InputMaybe<Scalars['ID']>;
  authorIDNotIn?: InputMaybe<Array<Scalars['ID']>>;
  /** created_at field predicates */
  createdAt?: InputMaybe<Scalars['Time']>;
  createdAtGT?: InputMaybe<Scalars['Time']>;
  createdAtGTE?: InputMaybe<Scalars['Time']>;
  createdAtIn?: InputMaybe<Array<Scalars['Time']>>;
  createdAtLT?: InputMaybe<Scalars['Time']>;
  createdAtLTE?: InputMaybe<Scalars['Time']>;
  createdAtNEQ?: InputMaybe<Scalars['Time']>;
  createdAtNotIn?: InputMaybe<Array<Scalars['Time']>>;
  /** author edge predicates */
  hasAuthor?: InputMaybe<Scalars['Boolean']>;
  hasAuthorWith?: InputMaybe<Array<UserWhereInput>>;
  /** parts edge predicates */
  hasParts?: InputMaybe<Scalars['Boolean']>;
  hasPartsWith?: InputMaybe<Array<PartWhereInput>>;
  /** id field predicates */
  id?: InputMaybe<Scalars['ID']>;
  idContainsFold?: InputMaybe<Scalars['ID']>;
  idEqualFold?: InputMaybe<Scalars['ID']>;
  idGT?: InputMaybe<Scalars['ID']>;
  idGTE?: InputMaybe<Scalars['ID']>;
  idIn?: InputMaybe<Array<Scalars['ID']>>;
  idLT?: InputMaybe<Scalars['ID']>;
  idLTE?: InputMaybe<Scalars['ID']>;
  idNEQ?: InputMaybe<Scalars['ID']>;
  idNotIn?: InputMaybe<Array<Scalars['ID']>>;
  /** name field predicates */
  name?: InputMaybe<Scalars['String']>;
  nameContains?: InputMaybe<Scalars['String']>;
  nameContainsFold?: InputMaybe<Scalars['String']>;
  nameEqualFold?: InputMaybe<Scalars['String']>;
  nameGT?: InputMaybe<Scalars['String']>;
  nameGTE?: InputMaybe<Scalars['String']>;
  nameHasPrefix?: InputMaybe<Scalars['String']>;
  nameHasSuffix?: InputMaybe<Scalars['String']>;
  nameIn?: InputMaybe<Array<Scalars['String']>>;
  nameLT?: InputMaybe<Scalars['String']>;
  nameLTE?: InputMaybe<Scalars['String']>;
  nameNEQ?: InputMaybe<Scalars['String']>;
  nameNotIn?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<WorkWhereInput>;
  or?: InputMaybe<Array<WorkWhereInput>>;
  /** updated_at field predicates */
  updatedAt?: InputMaybe<Scalars['Time']>;
  updatedAtGT?: InputMaybe<Scalars['Time']>;
  updatedAtGTE?: InputMaybe<Scalars['Time']>;
  updatedAtIn?: InputMaybe<Array<Scalars['Time']>>;
  updatedAtLT?: InputMaybe<Scalars['Time']>;
  updatedAtLTE?: InputMaybe<Scalars['Time']>;
  updatedAtNEQ?: InputMaybe<Scalars['Time']>;
  updatedAtNotIn?: InputMaybe<Array<Scalars['Time']>>;
};

export type GetWorksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWorksQuery = { __typename?: 'Query', getUserFromUserId: { __typename?: 'User', id: ID, works?: Array<{ __typename?: 'Work', id: ID, name: String, createdAt: Time, updatedAt: Time, authorID: ID }> | null } };

export type GetPartsQueryVariables = Exact<{
  workId: Scalars['ID'];
}>;


export type GetPartsQuery = { __typename?: 'Query', getWorkById: { __typename?: 'Work', id: ID, parts?: Array<{ __typename?: 'Part', id: ID, authorID: String, workID: ID, name: String, createdAt: Time }> | null } };

export type GetWorkNameQueryVariables = Exact<{
  workId: Scalars['ID'];
}>;


export type GetWorkNameQuery = { __typename?: 'Query', getWorkById: { __typename?: 'Work', id: ID, name: String } };

export type GetBlocksQueryVariables = Exact<{
  partId: Scalars['ID'];
}>;


export type GetBlocksQuery = { __typename?: 'Query', getPartById: { __typename?: 'Part', id: ID, blocks?: Array<{ __typename?: 'Block', id: ID, partID: ID, speed: Float, speaker: String, texts: String, duration: Int, pitch: Int, volume: Float, authorID: String }> | null } };

export type CreateBlockMutationVariables = Exact<{
  partId: Scalars['String'];
}>;


export type CreateBlockMutation = { __typename?: 'Mutation', createBlock: { __typename?: 'Block', id: ID, partID: ID, speed: Float, speaker: String, texts: String, duration: Int, pitch: Int, volume: Float, authorID: String } };

export type CreatePartMutationVariables = Exact<{
  workId: Scalars['String'];
}>;


export type CreatePartMutation = { __typename?: 'Mutation', createPart: { __typename?: 'Part', id: ID, authorID: String, workID: ID, name: String, createdAt: Time } };

export type CreateWorkMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateWorkMutation = { __typename?: 'Mutation', createWork: { __typename?: 'Work', id: ID, name: String, createdAt: Time, updatedAt: Time, authorID: ID } };

export type CreateUserMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: ID } };

export type UpdateWorkMutationVariables = Exact<{
  name: Scalars['String'];
  workId: Scalars['ID'];
}>;


export type UpdateWorkMutation = { __typename?: 'Mutation', updateWork: { __typename?: 'Work', name: String, id: ID, authorID: ID, createdAt: Time, updatedAt: Time } };

export type UpdatePartMutationVariables = Exact<{
  name: Scalars['String'];
  partId: Scalars['ID'];
}>;


export type UpdatePartMutation = { __typename?: 'Mutation', updatePart: { __typename?: 'Part', id: ID, authorID: String, workID: ID, name: String, createdAt: Time } };

export type UpdateBlockMutationVariables = Exact<{
  blockId: Scalars['ID'];
  speed?: InputMaybe<Scalars['Float']>;
  speaker?: InputMaybe<Scalars['String']>;
  texts?: InputMaybe<Scalars['String']>;
  duration?: InputMaybe<Scalars['Int']>;
  pitch?: InputMaybe<Scalars['Int']>;
  volume?: InputMaybe<Scalars['Float']>;
}>;


export type UpdateBlockMutation = { __typename?: 'Mutation', updateBlock: { __typename?: 'Block', id: ID, partID: ID, speed: Float, speaker: String, texts: String, duration: Int, pitch: Int, volume: Float, authorID: String } };

export type DeleteWorkMutationVariables = Exact<{
  workId: Scalars['ID'];
}>;


export type DeleteWorkMutation = { __typename?: 'Mutation', deleteWork?: Boolean | null };

export type DeletePartMutationVariables = Exact<{
  partId: Scalars['ID'];
}>;


export type DeletePartMutation = { __typename?: 'Mutation', deletePart?: Boolean | null };

export type DeleteBlockMutationVariables = Exact<{
  blockId: Scalars['ID'];
}>;


export type DeleteBlockMutation = { __typename?: 'Mutation', deleteBlock?: Boolean | null };


export const GetWorksDocument = gql`
    query getWorks {
  getUserFromUserId {
    id
    works {
      id
      name
      createdAt
      updatedAt
      authorID
    }
  }
}
    `;
export const GetPartsDocument = gql`
    query getParts($workId: ID!) {
  getWorkById(workId: $workId) {
    id
    parts {
      id
      authorID
      workID
      name
      createdAt
    }
  }
}
    `;
export const GetWorkNameDocument = gql`
    query getWorkName($workId: ID!) {
  getWorkById(workId: $workId) {
    id
    name
  }
}
    `;
export const GetBlocksDocument = gql`
    query getBlocks($partId: ID!) {
  getPartById(partId: $partId) {
    id
    blocks {
      id
      partID
      speed
      speaker
      texts
      duration
      pitch
      volume
      authorID
    }
  }
}
    `;
export const CreateBlockDocument = gql`
    mutation createBlock($partId: String!) {
  createBlock(partId: $partId) {
    id
    partID
    speed
    speaker
    texts
    duration
    pitch
    volume
    authorID
  }
}
    `;
export const CreatePartDocument = gql`
    mutation createPart($workId: String!) {
  createPart(workId: $workId) {
    id
    authorID
    workID
    name
    createdAt
  }
}
    `;
export const CreateWorkDocument = gql`
    mutation createWork {
  createWork {
    id
    name
    createdAt
    updatedAt
    authorID
  }
}
    `;
export const CreateUserDocument = gql`
    mutation createUser {
  createUser {
    id
  }
}
    `;
export const UpdateWorkDocument = gql`
    mutation updateWork($name: String!, $workId: ID!) {
  updateWork(name: $name, workId: $workId) {
    name
    id
    authorID
    createdAt
    updatedAt
  }
}
    `;
export const UpdatePartDocument = gql`
    mutation updatePart($name: String!, $partId: ID!) {
  updatePart(name: $name, partId: $partId) {
    id
    authorID
    workID
    name
    createdAt
  }
}
    `;
export const UpdateBlockDocument = gql`
    mutation updateBlock($blockId: ID!, $speed: Float, $speaker: String, $texts: String, $duration: Int, $pitch: Int, $volume: Float) {
  updateBlock(
    blockId: $blockId
    speed: $speed
    speaker: $speaker
    texts: $texts
    duration: $duration
    pitch: $pitch
    volume: $volume
  ) {
    id
    partID
    speed
    speaker
    texts
    duration
    pitch
    volume
    authorID
  }
}
    `;
export const DeleteWorkDocument = gql`
    mutation deleteWork($workId: ID!) {
  deleteWork(workId: $workId)
}
    `;
export const DeletePartDocument = gql`
    mutation deletePart($partId: ID!) {
  deletePart(partId: $partId)
}
    `;
export const DeleteBlockDocument = gql`
    mutation deleteBlock($blockId: ID!) {
  deleteBlock(blockId: $blockId)
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getWorks(variables?: GetWorksQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetWorksQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetWorksQuery>(GetWorksDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getWorks', 'query');
    },
    getParts(variables: GetPartsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetPartsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPartsQuery>(GetPartsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getParts', 'query');
    },
    getWorkName(variables: GetWorkNameQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetWorkNameQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetWorkNameQuery>(GetWorkNameDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getWorkName', 'query');
    },
    getBlocks(variables: GetBlocksQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetBlocksQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetBlocksQuery>(GetBlocksDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getBlocks', 'query');
    },
    createBlock(variables: CreateBlockMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateBlockMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateBlockMutation>(CreateBlockDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createBlock', 'mutation');
    },
    createPart(variables: CreatePartMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreatePartMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreatePartMutation>(CreatePartDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createPart', 'mutation');
    },
    createWork(variables?: CreateWorkMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateWorkMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateWorkMutation>(CreateWorkDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createWork', 'mutation');
    },
    createUser(variables?: CreateUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateUserMutation>(CreateUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createUser', 'mutation');
    },
    updateWork(variables: UpdateWorkMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateWorkMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateWorkMutation>(UpdateWorkDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateWork', 'mutation');
    },
    updatePart(variables: UpdatePartMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdatePartMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdatePartMutation>(UpdatePartDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updatePart', 'mutation');
    },
    updateBlock(variables: UpdateBlockMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateBlockMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateBlockMutation>(UpdateBlockDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateBlock', 'mutation');
    },
    deleteWork(variables: DeleteWorkMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteWorkMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteWorkMutation>(DeleteWorkDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteWork', 'mutation');
    },
    deletePart(variables: DeletePartMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeletePartMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeletePartMutation>(DeletePartDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deletePart', 'mutation');
    },
    deleteBlock(variables: DeleteBlockMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteBlockMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteBlockMutation>(DeleteBlockDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteBlock', 'mutation');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;