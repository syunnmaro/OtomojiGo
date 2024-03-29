// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"errors"
	"graphql-test-api/ent/block"
	"graphql-test-api/ent/part"
	"graphql-test-api/ent/user"
	"graphql-test-api/ent/work"

	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/dialect/sql"
	"github.com/99designs/gqlgen/graphql"
	"github.com/99designs/gqlgen/graphql/errcode"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

// Common entgql types.
type (
	Cursor         = entgql.Cursor[string]
	PageInfo       = entgql.PageInfo[string]
	OrderDirection = entgql.OrderDirection
)

func orderFunc(o OrderDirection, field string) func(*sql.Selector) {
	if o == entgql.OrderDirectionDesc {
		return Desc(field)
	}
	return Asc(field)
}

const errInvalidPagination = "INVALID_PAGINATION"

func validateFirstLast(first, last *int) (err *gqlerror.Error) {
	switch {
	case first != nil && last != nil:
		err = &gqlerror.Error{
			Message: "Passing both `first` and `last` to paginate a connection is not supported.",
		}
	case first != nil && *first < 0:
		err = &gqlerror.Error{
			Message: "`first` on a connection cannot be less than zero.",
		}
		errcode.Set(err, errInvalidPagination)
	case last != nil && *last < 0:
		err = &gqlerror.Error{
			Message: "`last` on a connection cannot be less than zero.",
		}
		errcode.Set(err, errInvalidPagination)
	}
	return err
}

func collectedField(ctx context.Context, path ...string) *graphql.CollectedField {
	fc := graphql.GetFieldContext(ctx)
	if fc == nil {
		return nil
	}
	field := fc.Field
	oc := graphql.GetOperationContext(ctx)
walk:
	for _, name := range path {
		for _, f := range graphql.CollectFields(oc, field.Selections, nil) {
			if f.Alias == name {
				field = f
				continue walk
			}
		}
		return nil
	}
	return &field
}

func hasCollectedField(ctx context.Context, path ...string) bool {
	if graphql.GetFieldContext(ctx) == nil {
		return true
	}
	return collectedField(ctx, path...) != nil
}

const (
	edgesField      = "edges"
	nodeField       = "node"
	pageInfoField   = "pageInfo"
	totalCountField = "totalCount"
)

func paginateLimit(first, last *int) int {
	var limit int
	if first != nil {
		limit = *first + 1
	} else if last != nil {
		limit = *last + 1
	}
	return limit
}

// BlockEdge is the edge representation of Block.
type BlockEdge struct {
	Node   *Block `json:"node"`
	Cursor Cursor `json:"cursor"`
}

// BlockConnection is the connection containing edges to Block.
type BlockConnection struct {
	Edges      []*BlockEdge `json:"edges"`
	PageInfo   PageInfo     `json:"pageInfo"`
	TotalCount int          `json:"totalCount"`
}

func (c *BlockConnection) build(nodes []*Block, pager *blockPager, after *Cursor, first *int, before *Cursor, last *int) {
	c.PageInfo.HasNextPage = before != nil
	c.PageInfo.HasPreviousPage = after != nil
	if first != nil && *first+1 == len(nodes) {
		c.PageInfo.HasNextPage = true
		nodes = nodes[:len(nodes)-1]
	} else if last != nil && *last+1 == len(nodes) {
		c.PageInfo.HasPreviousPage = true
		nodes = nodes[:len(nodes)-1]
	}
	var nodeAt func(int) *Block
	if last != nil {
		n := len(nodes) - 1
		nodeAt = func(i int) *Block {
			return nodes[n-i]
		}
	} else {
		nodeAt = func(i int) *Block {
			return nodes[i]
		}
	}
	c.Edges = make([]*BlockEdge, len(nodes))
	for i := range nodes {
		node := nodeAt(i)
		c.Edges[i] = &BlockEdge{
			Node:   node,
			Cursor: pager.toCursor(node),
		}
	}
	if l := len(c.Edges); l > 0 {
		c.PageInfo.StartCursor = &c.Edges[0].Cursor
		c.PageInfo.EndCursor = &c.Edges[l-1].Cursor
	}
	if c.TotalCount == 0 {
		c.TotalCount = len(nodes)
	}
}

// BlockPaginateOption enables pagination customization.
type BlockPaginateOption func(*blockPager) error

// WithBlockOrder configures pagination ordering.
func WithBlockOrder(order *BlockOrder) BlockPaginateOption {
	if order == nil {
		order = DefaultBlockOrder
	}
	o := *order
	return func(pager *blockPager) error {
		if err := o.Direction.Validate(); err != nil {
			return err
		}
		if o.Field == nil {
			o.Field = DefaultBlockOrder.Field
		}
		pager.order = &o
		return nil
	}
}

// WithBlockFilter configures pagination filter.
func WithBlockFilter(filter func(*BlockQuery) (*BlockQuery, error)) BlockPaginateOption {
	return func(pager *blockPager) error {
		if filter == nil {
			return errors.New("BlockQuery filter cannot be nil")
		}
		pager.filter = filter
		return nil
	}
}

type blockPager struct {
	reverse bool
	order   *BlockOrder
	filter  func(*BlockQuery) (*BlockQuery, error)
}

func newBlockPager(opts []BlockPaginateOption, reverse bool) (*blockPager, error) {
	pager := &blockPager{reverse: reverse}
	for _, opt := range opts {
		if err := opt(pager); err != nil {
			return nil, err
		}
	}
	if pager.order == nil {
		pager.order = DefaultBlockOrder
	}
	return pager, nil
}

func (p *blockPager) applyFilter(query *BlockQuery) (*BlockQuery, error) {
	if p.filter != nil {
		return p.filter(query)
	}
	return query, nil
}

func (p *blockPager) toCursor(b *Block) Cursor {
	return p.order.Field.toCursor(b)
}

func (p *blockPager) applyCursors(query *BlockQuery, after, before *Cursor) (*BlockQuery, error) {
	direction := p.order.Direction
	if p.reverse {
		direction = direction.Reverse()
	}
	for _, predicate := range entgql.CursorsPredicate(after, before, DefaultBlockOrder.Field.column, p.order.Field.column, direction) {
		query = query.Where(predicate)
	}
	return query, nil
}

func (p *blockPager) applyOrder(query *BlockQuery) *BlockQuery {
	direction := p.order.Direction
	if p.reverse {
		direction = direction.Reverse()
	}
	query = query.Order(p.order.Field.toTerm(direction.OrderTermOption()))
	if p.order.Field != DefaultBlockOrder.Field {
		query = query.Order(DefaultBlockOrder.Field.toTerm(direction.OrderTermOption()))
	}
	if len(query.ctx.Fields) > 0 {
		query.ctx.AppendFieldOnce(p.order.Field.column)
	}
	return query
}

func (p *blockPager) orderExpr(query *BlockQuery) sql.Querier {
	direction := p.order.Direction
	if p.reverse {
		direction = direction.Reverse()
	}
	if len(query.ctx.Fields) > 0 {
		query.ctx.AppendFieldOnce(p.order.Field.column)
	}
	return sql.ExprFunc(func(b *sql.Builder) {
		b.Ident(p.order.Field.column).Pad().WriteString(string(direction))
		if p.order.Field != DefaultBlockOrder.Field {
			b.Comma().Ident(DefaultBlockOrder.Field.column).Pad().WriteString(string(direction))
		}
	})
}

// Paginate executes the query and returns a relay based cursor connection to Block.
func (b *BlockQuery) Paginate(
	ctx context.Context, after *Cursor, first *int,
	before *Cursor, last *int, opts ...BlockPaginateOption,
) (*BlockConnection, error) {
	if err := validateFirstLast(first, last); err != nil {
		return nil, err
	}
	pager, err := newBlockPager(opts, last != nil)
	if err != nil {
		return nil, err
	}
	if b, err = pager.applyFilter(b); err != nil {
		return nil, err
	}
	conn := &BlockConnection{Edges: []*BlockEdge{}}
	ignoredEdges := !hasCollectedField(ctx, edgesField)
	if hasCollectedField(ctx, totalCountField) || hasCollectedField(ctx, pageInfoField) {
		hasPagination := after != nil || first != nil || before != nil || last != nil
		if hasPagination || ignoredEdges {
			if conn.TotalCount, err = b.Clone().Count(ctx); err != nil {
				return nil, err
			}
			conn.PageInfo.HasNextPage = first != nil && conn.TotalCount > 0
			conn.PageInfo.HasPreviousPage = last != nil && conn.TotalCount > 0
		}
	}
	if ignoredEdges || (first != nil && *first == 0) || (last != nil && *last == 0) {
		return conn, nil
	}
	if b, err = pager.applyCursors(b, after, before); err != nil {
		return nil, err
	}
	if limit := paginateLimit(first, last); limit != 0 {
		b.Limit(limit)
	}
	if field := collectedField(ctx, edgesField, nodeField); field != nil {
		if err := b.collectField(ctx, graphql.GetOperationContext(ctx), *field, []string{edgesField, nodeField}); err != nil {
			return nil, err
		}
	}
	b = pager.applyOrder(b)
	nodes, err := b.All(ctx)
	if err != nil {
		return nil, err
	}
	conn.build(nodes, pager, after, first, before, last)
	return conn, nil
}

// BlockOrderField defines the ordering field of Block.
type BlockOrderField struct {
	// Value extracts the ordering value from the given Block.
	Value    func(*Block) (ent.Value, error)
	column   string // field or computed.
	toTerm   func(...sql.OrderTermOption) block.OrderOption
	toCursor func(*Block) Cursor
}

// BlockOrder defines the ordering of Block.
type BlockOrder struct {
	Direction OrderDirection   `json:"direction"`
	Field     *BlockOrderField `json:"field"`
}

// DefaultBlockOrder is the default ordering of Block.
var DefaultBlockOrder = &BlockOrder{
	Direction: entgql.OrderDirectionAsc,
	Field: &BlockOrderField{
		Value: func(b *Block) (ent.Value, error) {
			return b.ID, nil
		},
		column: block.FieldID,
		toTerm: block.ByID,
		toCursor: func(b *Block) Cursor {
			return Cursor{ID: b.ID}
		},
	},
}

// ToEdge converts Block into BlockEdge.
func (b *Block) ToEdge(order *BlockOrder) *BlockEdge {
	if order == nil {
		order = DefaultBlockOrder
	}
	return &BlockEdge{
		Node:   b,
		Cursor: order.Field.toCursor(b),
	}
}

// PartEdge is the edge representation of Part.
type PartEdge struct {
	Node   *Part  `json:"node"`
	Cursor Cursor `json:"cursor"`
}

// PartConnection is the connection containing edges to Part.
type PartConnection struct {
	Edges      []*PartEdge `json:"edges"`
	PageInfo   PageInfo    `json:"pageInfo"`
	TotalCount int         `json:"totalCount"`
}

func (c *PartConnection) build(nodes []*Part, pager *partPager, after *Cursor, first *int, before *Cursor, last *int) {
	c.PageInfo.HasNextPage = before != nil
	c.PageInfo.HasPreviousPage = after != nil
	if first != nil && *first+1 == len(nodes) {
		c.PageInfo.HasNextPage = true
		nodes = nodes[:len(nodes)-1]
	} else if last != nil && *last+1 == len(nodes) {
		c.PageInfo.HasPreviousPage = true
		nodes = nodes[:len(nodes)-1]
	}
	var nodeAt func(int) *Part
	if last != nil {
		n := len(nodes) - 1
		nodeAt = func(i int) *Part {
			return nodes[n-i]
		}
	} else {
		nodeAt = func(i int) *Part {
			return nodes[i]
		}
	}
	c.Edges = make([]*PartEdge, len(nodes))
	for i := range nodes {
		node := nodeAt(i)
		c.Edges[i] = &PartEdge{
			Node:   node,
			Cursor: pager.toCursor(node),
		}
	}
	if l := len(c.Edges); l > 0 {
		c.PageInfo.StartCursor = &c.Edges[0].Cursor
		c.PageInfo.EndCursor = &c.Edges[l-1].Cursor
	}
	if c.TotalCount == 0 {
		c.TotalCount = len(nodes)
	}
}

// PartPaginateOption enables pagination customization.
type PartPaginateOption func(*partPager) error

// WithPartOrder configures pagination ordering.
func WithPartOrder(order *PartOrder) PartPaginateOption {
	if order == nil {
		order = DefaultPartOrder
	}
	o := *order
	return func(pager *partPager) error {
		if err := o.Direction.Validate(); err != nil {
			return err
		}
		if o.Field == nil {
			o.Field = DefaultPartOrder.Field
		}
		pager.order = &o
		return nil
	}
}

// WithPartFilter configures pagination filter.
func WithPartFilter(filter func(*PartQuery) (*PartQuery, error)) PartPaginateOption {
	return func(pager *partPager) error {
		if filter == nil {
			return errors.New("PartQuery filter cannot be nil")
		}
		pager.filter = filter
		return nil
	}
}

type partPager struct {
	reverse bool
	order   *PartOrder
	filter  func(*PartQuery) (*PartQuery, error)
}

func newPartPager(opts []PartPaginateOption, reverse bool) (*partPager, error) {
	pager := &partPager{reverse: reverse}
	for _, opt := range opts {
		if err := opt(pager); err != nil {
			return nil, err
		}
	}
	if pager.order == nil {
		pager.order = DefaultPartOrder
	}
	return pager, nil
}

func (p *partPager) applyFilter(query *PartQuery) (*PartQuery, error) {
	if p.filter != nil {
		return p.filter(query)
	}
	return query, nil
}

func (p *partPager) toCursor(pa *Part) Cursor {
	return p.order.Field.toCursor(pa)
}

func (p *partPager) applyCursors(query *PartQuery, after, before *Cursor) (*PartQuery, error) {
	direction := p.order.Direction
	if p.reverse {
		direction = direction.Reverse()
	}
	for _, predicate := range entgql.CursorsPredicate(after, before, DefaultPartOrder.Field.column, p.order.Field.column, direction) {
		query = query.Where(predicate)
	}
	return query, nil
}

func (p *partPager) applyOrder(query *PartQuery) *PartQuery {
	direction := p.order.Direction
	if p.reverse {
		direction = direction.Reverse()
	}
	query = query.Order(p.order.Field.toTerm(direction.OrderTermOption()))
	if p.order.Field != DefaultPartOrder.Field {
		query = query.Order(DefaultPartOrder.Field.toTerm(direction.OrderTermOption()))
	}
	if len(query.ctx.Fields) > 0 {
		query.ctx.AppendFieldOnce(p.order.Field.column)
	}
	return query
}

func (p *partPager) orderExpr(query *PartQuery) sql.Querier {
	direction := p.order.Direction
	if p.reverse {
		direction = direction.Reverse()
	}
	if len(query.ctx.Fields) > 0 {
		query.ctx.AppendFieldOnce(p.order.Field.column)
	}
	return sql.ExprFunc(func(b *sql.Builder) {
		b.Ident(p.order.Field.column).Pad().WriteString(string(direction))
		if p.order.Field != DefaultPartOrder.Field {
			b.Comma().Ident(DefaultPartOrder.Field.column).Pad().WriteString(string(direction))
		}
	})
}

// Paginate executes the query and returns a relay based cursor connection to Part.
func (pa *PartQuery) Paginate(
	ctx context.Context, after *Cursor, first *int,
	before *Cursor, last *int, opts ...PartPaginateOption,
) (*PartConnection, error) {
	if err := validateFirstLast(first, last); err != nil {
		return nil, err
	}
	pager, err := newPartPager(opts, last != nil)
	if err != nil {
		return nil, err
	}
	if pa, err = pager.applyFilter(pa); err != nil {
		return nil, err
	}
	conn := &PartConnection{Edges: []*PartEdge{}}
	ignoredEdges := !hasCollectedField(ctx, edgesField)
	if hasCollectedField(ctx, totalCountField) || hasCollectedField(ctx, pageInfoField) {
		hasPagination := after != nil || first != nil || before != nil || last != nil
		if hasPagination || ignoredEdges {
			if conn.TotalCount, err = pa.Clone().Count(ctx); err != nil {
				return nil, err
			}
			conn.PageInfo.HasNextPage = first != nil && conn.TotalCount > 0
			conn.PageInfo.HasPreviousPage = last != nil && conn.TotalCount > 0
		}
	}
	if ignoredEdges || (first != nil && *first == 0) || (last != nil && *last == 0) {
		return conn, nil
	}
	if pa, err = pager.applyCursors(pa, after, before); err != nil {
		return nil, err
	}
	if limit := paginateLimit(first, last); limit != 0 {
		pa.Limit(limit)
	}
	if field := collectedField(ctx, edgesField, nodeField); field != nil {
		if err := pa.collectField(ctx, graphql.GetOperationContext(ctx), *field, []string{edgesField, nodeField}); err != nil {
			return nil, err
		}
	}
	pa = pager.applyOrder(pa)
	nodes, err := pa.All(ctx)
	if err != nil {
		return nil, err
	}
	conn.build(nodes, pager, after, first, before, last)
	return conn, nil
}

// PartOrderField defines the ordering field of Part.
type PartOrderField struct {
	// Value extracts the ordering value from the given Part.
	Value    func(*Part) (ent.Value, error)
	column   string // field or computed.
	toTerm   func(...sql.OrderTermOption) part.OrderOption
	toCursor func(*Part) Cursor
}

// PartOrder defines the ordering of Part.
type PartOrder struct {
	Direction OrderDirection  `json:"direction"`
	Field     *PartOrderField `json:"field"`
}

// DefaultPartOrder is the default ordering of Part.
var DefaultPartOrder = &PartOrder{
	Direction: entgql.OrderDirectionAsc,
	Field: &PartOrderField{
		Value: func(pa *Part) (ent.Value, error) {
			return pa.ID, nil
		},
		column: part.FieldID,
		toTerm: part.ByID,
		toCursor: func(pa *Part) Cursor {
			return Cursor{ID: pa.ID}
		},
	},
}

// ToEdge converts Part into PartEdge.
func (pa *Part) ToEdge(order *PartOrder) *PartEdge {
	if order == nil {
		order = DefaultPartOrder
	}
	return &PartEdge{
		Node:   pa,
		Cursor: order.Field.toCursor(pa),
	}
}

// UserEdge is the edge representation of User.
type UserEdge struct {
	Node   *User  `json:"node"`
	Cursor Cursor `json:"cursor"`
}

// UserConnection is the connection containing edges to User.
type UserConnection struct {
	Edges      []*UserEdge `json:"edges"`
	PageInfo   PageInfo    `json:"pageInfo"`
	TotalCount int         `json:"totalCount"`
}

func (c *UserConnection) build(nodes []*User, pager *userPager, after *Cursor, first *int, before *Cursor, last *int) {
	c.PageInfo.HasNextPage = before != nil
	c.PageInfo.HasPreviousPage = after != nil
	if first != nil && *first+1 == len(nodes) {
		c.PageInfo.HasNextPage = true
		nodes = nodes[:len(nodes)-1]
	} else if last != nil && *last+1 == len(nodes) {
		c.PageInfo.HasPreviousPage = true
		nodes = nodes[:len(nodes)-1]
	}
	var nodeAt func(int) *User
	if last != nil {
		n := len(nodes) - 1
		nodeAt = func(i int) *User {
			return nodes[n-i]
		}
	} else {
		nodeAt = func(i int) *User {
			return nodes[i]
		}
	}
	c.Edges = make([]*UserEdge, len(nodes))
	for i := range nodes {
		node := nodeAt(i)
		c.Edges[i] = &UserEdge{
			Node:   node,
			Cursor: pager.toCursor(node),
		}
	}
	if l := len(c.Edges); l > 0 {
		c.PageInfo.StartCursor = &c.Edges[0].Cursor
		c.PageInfo.EndCursor = &c.Edges[l-1].Cursor
	}
	if c.TotalCount == 0 {
		c.TotalCount = len(nodes)
	}
}

// UserPaginateOption enables pagination customization.
type UserPaginateOption func(*userPager) error

// WithUserOrder configures pagination ordering.
func WithUserOrder(order *UserOrder) UserPaginateOption {
	if order == nil {
		order = DefaultUserOrder
	}
	o := *order
	return func(pager *userPager) error {
		if err := o.Direction.Validate(); err != nil {
			return err
		}
		if o.Field == nil {
			o.Field = DefaultUserOrder.Field
		}
		pager.order = &o
		return nil
	}
}

// WithUserFilter configures pagination filter.
func WithUserFilter(filter func(*UserQuery) (*UserQuery, error)) UserPaginateOption {
	return func(pager *userPager) error {
		if filter == nil {
			return errors.New("UserQuery filter cannot be nil")
		}
		pager.filter = filter
		return nil
	}
}

type userPager struct {
	reverse bool
	order   *UserOrder
	filter  func(*UserQuery) (*UserQuery, error)
}

func newUserPager(opts []UserPaginateOption, reverse bool) (*userPager, error) {
	pager := &userPager{reverse: reverse}
	for _, opt := range opts {
		if err := opt(pager); err != nil {
			return nil, err
		}
	}
	if pager.order == nil {
		pager.order = DefaultUserOrder
	}
	return pager, nil
}

func (p *userPager) applyFilter(query *UserQuery) (*UserQuery, error) {
	if p.filter != nil {
		return p.filter(query)
	}
	return query, nil
}

func (p *userPager) toCursor(u *User) Cursor {
	return p.order.Field.toCursor(u)
}

func (p *userPager) applyCursors(query *UserQuery, after, before *Cursor) (*UserQuery, error) {
	direction := p.order.Direction
	if p.reverse {
		direction = direction.Reverse()
	}
	for _, predicate := range entgql.CursorsPredicate(after, before, DefaultUserOrder.Field.column, p.order.Field.column, direction) {
		query = query.Where(predicate)
	}
	return query, nil
}

func (p *userPager) applyOrder(query *UserQuery) *UserQuery {
	direction := p.order.Direction
	if p.reverse {
		direction = direction.Reverse()
	}
	query = query.Order(p.order.Field.toTerm(direction.OrderTermOption()))
	if p.order.Field != DefaultUserOrder.Field {
		query = query.Order(DefaultUserOrder.Field.toTerm(direction.OrderTermOption()))
	}
	if len(query.ctx.Fields) > 0 {
		query.ctx.AppendFieldOnce(p.order.Field.column)
	}
	return query
}

func (p *userPager) orderExpr(query *UserQuery) sql.Querier {
	direction := p.order.Direction
	if p.reverse {
		direction = direction.Reverse()
	}
	if len(query.ctx.Fields) > 0 {
		query.ctx.AppendFieldOnce(p.order.Field.column)
	}
	return sql.ExprFunc(func(b *sql.Builder) {
		b.Ident(p.order.Field.column).Pad().WriteString(string(direction))
		if p.order.Field != DefaultUserOrder.Field {
			b.Comma().Ident(DefaultUserOrder.Field.column).Pad().WriteString(string(direction))
		}
	})
}

// Paginate executes the query and returns a relay based cursor connection to User.
func (u *UserQuery) Paginate(
	ctx context.Context, after *Cursor, first *int,
	before *Cursor, last *int, opts ...UserPaginateOption,
) (*UserConnection, error) {
	if err := validateFirstLast(first, last); err != nil {
		return nil, err
	}
	pager, err := newUserPager(opts, last != nil)
	if err != nil {
		return nil, err
	}
	if u, err = pager.applyFilter(u); err != nil {
		return nil, err
	}
	conn := &UserConnection{Edges: []*UserEdge{}}
	ignoredEdges := !hasCollectedField(ctx, edgesField)
	if hasCollectedField(ctx, totalCountField) || hasCollectedField(ctx, pageInfoField) {
		hasPagination := after != nil || first != nil || before != nil || last != nil
		if hasPagination || ignoredEdges {
			if conn.TotalCount, err = u.Clone().Count(ctx); err != nil {
				return nil, err
			}
			conn.PageInfo.HasNextPage = first != nil && conn.TotalCount > 0
			conn.PageInfo.HasPreviousPage = last != nil && conn.TotalCount > 0
		}
	}
	if ignoredEdges || (first != nil && *first == 0) || (last != nil && *last == 0) {
		return conn, nil
	}
	if u, err = pager.applyCursors(u, after, before); err != nil {
		return nil, err
	}
	if limit := paginateLimit(first, last); limit != 0 {
		u.Limit(limit)
	}
	if field := collectedField(ctx, edgesField, nodeField); field != nil {
		if err := u.collectField(ctx, graphql.GetOperationContext(ctx), *field, []string{edgesField, nodeField}); err != nil {
			return nil, err
		}
	}
	u = pager.applyOrder(u)
	nodes, err := u.All(ctx)
	if err != nil {
		return nil, err
	}
	conn.build(nodes, pager, after, first, before, last)
	return conn, nil
}

// UserOrderField defines the ordering field of User.
type UserOrderField struct {
	// Value extracts the ordering value from the given User.
	Value    func(*User) (ent.Value, error)
	column   string // field or computed.
	toTerm   func(...sql.OrderTermOption) user.OrderOption
	toCursor func(*User) Cursor
}

// UserOrder defines the ordering of User.
type UserOrder struct {
	Direction OrderDirection  `json:"direction"`
	Field     *UserOrderField `json:"field"`
}

// DefaultUserOrder is the default ordering of User.
var DefaultUserOrder = &UserOrder{
	Direction: entgql.OrderDirectionAsc,
	Field: &UserOrderField{
		Value: func(u *User) (ent.Value, error) {
			return u.ID, nil
		},
		column: user.FieldID,
		toTerm: user.ByID,
		toCursor: func(u *User) Cursor {
			return Cursor{ID: u.ID}
		},
	},
}

// ToEdge converts User into UserEdge.
func (u *User) ToEdge(order *UserOrder) *UserEdge {
	if order == nil {
		order = DefaultUserOrder
	}
	return &UserEdge{
		Node:   u,
		Cursor: order.Field.toCursor(u),
	}
}

// WorkEdge is the edge representation of Work.
type WorkEdge struct {
	Node   *Work  `json:"node"`
	Cursor Cursor `json:"cursor"`
}

// WorkConnection is the connection containing edges to Work.
type WorkConnection struct {
	Edges      []*WorkEdge `json:"edges"`
	PageInfo   PageInfo    `json:"pageInfo"`
	TotalCount int         `json:"totalCount"`
}

func (c *WorkConnection) build(nodes []*Work, pager *workPager, after *Cursor, first *int, before *Cursor, last *int) {
	c.PageInfo.HasNextPage = before != nil
	c.PageInfo.HasPreviousPage = after != nil
	if first != nil && *first+1 == len(nodes) {
		c.PageInfo.HasNextPage = true
		nodes = nodes[:len(nodes)-1]
	} else if last != nil && *last+1 == len(nodes) {
		c.PageInfo.HasPreviousPage = true
		nodes = nodes[:len(nodes)-1]
	}
	var nodeAt func(int) *Work
	if last != nil {
		n := len(nodes) - 1
		nodeAt = func(i int) *Work {
			return nodes[n-i]
		}
	} else {
		nodeAt = func(i int) *Work {
			return nodes[i]
		}
	}
	c.Edges = make([]*WorkEdge, len(nodes))
	for i := range nodes {
		node := nodeAt(i)
		c.Edges[i] = &WorkEdge{
			Node:   node,
			Cursor: pager.toCursor(node),
		}
	}
	if l := len(c.Edges); l > 0 {
		c.PageInfo.StartCursor = &c.Edges[0].Cursor
		c.PageInfo.EndCursor = &c.Edges[l-1].Cursor
	}
	if c.TotalCount == 0 {
		c.TotalCount = len(nodes)
	}
}

// WorkPaginateOption enables pagination customization.
type WorkPaginateOption func(*workPager) error

// WithWorkOrder configures pagination ordering.
func WithWorkOrder(order *WorkOrder) WorkPaginateOption {
	if order == nil {
		order = DefaultWorkOrder
	}
	o := *order
	return func(pager *workPager) error {
		if err := o.Direction.Validate(); err != nil {
			return err
		}
		if o.Field == nil {
			o.Field = DefaultWorkOrder.Field
		}
		pager.order = &o
		return nil
	}
}

// WithWorkFilter configures pagination filter.
func WithWorkFilter(filter func(*WorkQuery) (*WorkQuery, error)) WorkPaginateOption {
	return func(pager *workPager) error {
		if filter == nil {
			return errors.New("WorkQuery filter cannot be nil")
		}
		pager.filter = filter
		return nil
	}
}

type workPager struct {
	reverse bool
	order   *WorkOrder
	filter  func(*WorkQuery) (*WorkQuery, error)
}

func newWorkPager(opts []WorkPaginateOption, reverse bool) (*workPager, error) {
	pager := &workPager{reverse: reverse}
	for _, opt := range opts {
		if err := opt(pager); err != nil {
			return nil, err
		}
	}
	if pager.order == nil {
		pager.order = DefaultWorkOrder
	}
	return pager, nil
}

func (p *workPager) applyFilter(query *WorkQuery) (*WorkQuery, error) {
	if p.filter != nil {
		return p.filter(query)
	}
	return query, nil
}

func (p *workPager) toCursor(w *Work) Cursor {
	return p.order.Field.toCursor(w)
}

func (p *workPager) applyCursors(query *WorkQuery, after, before *Cursor) (*WorkQuery, error) {
	direction := p.order.Direction
	if p.reverse {
		direction = direction.Reverse()
	}
	for _, predicate := range entgql.CursorsPredicate(after, before, DefaultWorkOrder.Field.column, p.order.Field.column, direction) {
		query = query.Where(predicate)
	}
	return query, nil
}

func (p *workPager) applyOrder(query *WorkQuery) *WorkQuery {
	direction := p.order.Direction
	if p.reverse {
		direction = direction.Reverse()
	}
	query = query.Order(p.order.Field.toTerm(direction.OrderTermOption()))
	if p.order.Field != DefaultWorkOrder.Field {
		query = query.Order(DefaultWorkOrder.Field.toTerm(direction.OrderTermOption()))
	}
	if len(query.ctx.Fields) > 0 {
		query.ctx.AppendFieldOnce(p.order.Field.column)
	}
	return query
}

func (p *workPager) orderExpr(query *WorkQuery) sql.Querier {
	direction := p.order.Direction
	if p.reverse {
		direction = direction.Reverse()
	}
	if len(query.ctx.Fields) > 0 {
		query.ctx.AppendFieldOnce(p.order.Field.column)
	}
	return sql.ExprFunc(func(b *sql.Builder) {
		b.Ident(p.order.Field.column).Pad().WriteString(string(direction))
		if p.order.Field != DefaultWorkOrder.Field {
			b.Comma().Ident(DefaultWorkOrder.Field.column).Pad().WriteString(string(direction))
		}
	})
}

// Paginate executes the query and returns a relay based cursor connection to Work.
func (w *WorkQuery) Paginate(
	ctx context.Context, after *Cursor, first *int,
	before *Cursor, last *int, opts ...WorkPaginateOption,
) (*WorkConnection, error) {
	if err := validateFirstLast(first, last); err != nil {
		return nil, err
	}
	pager, err := newWorkPager(opts, last != nil)
	if err != nil {
		return nil, err
	}
	if w, err = pager.applyFilter(w); err != nil {
		return nil, err
	}
	conn := &WorkConnection{Edges: []*WorkEdge{}}
	ignoredEdges := !hasCollectedField(ctx, edgesField)
	if hasCollectedField(ctx, totalCountField) || hasCollectedField(ctx, pageInfoField) {
		hasPagination := after != nil || first != nil || before != nil || last != nil
		if hasPagination || ignoredEdges {
			if conn.TotalCount, err = w.Clone().Count(ctx); err != nil {
				return nil, err
			}
			conn.PageInfo.HasNextPage = first != nil && conn.TotalCount > 0
			conn.PageInfo.HasPreviousPage = last != nil && conn.TotalCount > 0
		}
	}
	if ignoredEdges || (first != nil && *first == 0) || (last != nil && *last == 0) {
		return conn, nil
	}
	if w, err = pager.applyCursors(w, after, before); err != nil {
		return nil, err
	}
	if limit := paginateLimit(first, last); limit != 0 {
		w.Limit(limit)
	}
	if field := collectedField(ctx, edgesField, nodeField); field != nil {
		if err := w.collectField(ctx, graphql.GetOperationContext(ctx), *field, []string{edgesField, nodeField}); err != nil {
			return nil, err
		}
	}
	w = pager.applyOrder(w)
	nodes, err := w.All(ctx)
	if err != nil {
		return nil, err
	}
	conn.build(nodes, pager, after, first, before, last)
	return conn, nil
}

// WorkOrderField defines the ordering field of Work.
type WorkOrderField struct {
	// Value extracts the ordering value from the given Work.
	Value    func(*Work) (ent.Value, error)
	column   string // field or computed.
	toTerm   func(...sql.OrderTermOption) work.OrderOption
	toCursor func(*Work) Cursor
}

// WorkOrder defines the ordering of Work.
type WorkOrder struct {
	Direction OrderDirection  `json:"direction"`
	Field     *WorkOrderField `json:"field"`
}

// DefaultWorkOrder is the default ordering of Work.
var DefaultWorkOrder = &WorkOrder{
	Direction: entgql.OrderDirectionAsc,
	Field: &WorkOrderField{
		Value: func(w *Work) (ent.Value, error) {
			return w.ID, nil
		},
		column: work.FieldID,
		toTerm: work.ByID,
		toCursor: func(w *Work) Cursor {
			return Cursor{ID: w.ID}
		},
	},
}

// ToEdge converts Work into WorkEdge.
func (w *Work) ToEdge(order *WorkOrder) *WorkEdge {
	if order == nil {
		order = DefaultWorkOrder
	}
	return &WorkEdge{
		Node:   w,
		Cursor: order.Field.toCursor(w),
	}
}
