// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"database/sql/driver"
	"fmt"
	"graphql-test-api/ent/part"
	"graphql-test-api/ent/predicate"
	"graphql-test-api/ent/user"
	"graphql-test-api/ent/work"
	"math"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
)

// WorkQuery is the builder for querying Work entities.
type WorkQuery struct {
	config
	ctx            *QueryContext
	order          []work.OrderOption
	inters         []Interceptor
	predicates     []predicate.Work
	withAuthor     *UserQuery
	withParts      *PartQuery
	modifiers      []func(*sql.Selector)
	loadTotal      []func(context.Context, []*Work) error
	withNamedParts map[string]*PartQuery
	// intermediate query (i.e. traversal path).
	sql  *sql.Selector
	path func(context.Context) (*sql.Selector, error)
}

// Where adds a new predicate for the WorkQuery builder.
func (wq *WorkQuery) Where(ps ...predicate.Work) *WorkQuery {
	wq.predicates = append(wq.predicates, ps...)
	return wq
}

// Limit the number of records to be returned by this query.
func (wq *WorkQuery) Limit(limit int) *WorkQuery {
	wq.ctx.Limit = &limit
	return wq
}

// Offset to start from.
func (wq *WorkQuery) Offset(offset int) *WorkQuery {
	wq.ctx.Offset = &offset
	return wq
}

// Unique configures the query builder to filter duplicate records on query.
// By default, unique is set to true, and can be disabled using this method.
func (wq *WorkQuery) Unique(unique bool) *WorkQuery {
	wq.ctx.Unique = &unique
	return wq
}

// Order specifies how the records should be ordered.
func (wq *WorkQuery) Order(o ...work.OrderOption) *WorkQuery {
	wq.order = append(wq.order, o...)
	return wq
}

// QueryAuthor chains the current query on the "author" edge.
func (wq *WorkQuery) QueryAuthor() *UserQuery {
	query := (&UserClient{config: wq.config}).Query()
	query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
		if err := wq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		selector := wq.sqlQuery(ctx)
		if err := selector.Err(); err != nil {
			return nil, err
		}
		step := sqlgraph.NewStep(
			sqlgraph.From(work.Table, work.FieldID, selector),
			sqlgraph.To(user.Table, user.FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, work.AuthorTable, work.AuthorColumn),
		)
		fromU = sqlgraph.SetNeighbors(wq.driver.Dialect(), step)
		return fromU, nil
	}
	return query
}

// QueryParts chains the current query on the "parts" edge.
func (wq *WorkQuery) QueryParts() *PartQuery {
	query := (&PartClient{config: wq.config}).Query()
	query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
		if err := wq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		selector := wq.sqlQuery(ctx)
		if err := selector.Err(); err != nil {
			return nil, err
		}
		step := sqlgraph.NewStep(
			sqlgraph.From(work.Table, work.FieldID, selector),
			sqlgraph.To(part.Table, part.FieldID),
			sqlgraph.Edge(sqlgraph.O2M, false, work.PartsTable, work.PartsColumn),
		)
		fromU = sqlgraph.SetNeighbors(wq.driver.Dialect(), step)
		return fromU, nil
	}
	return query
}

// First returns the first Work entity from the query.
// Returns a *NotFoundError when no Work was found.
func (wq *WorkQuery) First(ctx context.Context) (*Work, error) {
	nodes, err := wq.Limit(1).All(setContextOp(ctx, wq.ctx, "First"))
	if err != nil {
		return nil, err
	}
	if len(nodes) == 0 {
		return nil, &NotFoundError{work.Label}
	}
	return nodes[0], nil
}

// FirstX is like First, but panics if an error occurs.
func (wq *WorkQuery) FirstX(ctx context.Context) *Work {
	node, err := wq.First(ctx)
	if err != nil && !IsNotFound(err) {
		panic(err)
	}
	return node
}

// FirstID returns the first Work ID from the query.
// Returns a *NotFoundError when no Work ID was found.
func (wq *WorkQuery) FirstID(ctx context.Context) (id string, err error) {
	var ids []string
	if ids, err = wq.Limit(1).IDs(setContextOp(ctx, wq.ctx, "FirstID")); err != nil {
		return
	}
	if len(ids) == 0 {
		err = &NotFoundError{work.Label}
		return
	}
	return ids[0], nil
}

// FirstIDX is like FirstID, but panics if an error occurs.
func (wq *WorkQuery) FirstIDX(ctx context.Context) string {
	id, err := wq.FirstID(ctx)
	if err != nil && !IsNotFound(err) {
		panic(err)
	}
	return id
}

// Only returns a single Work entity found by the query, ensuring it only returns one.
// Returns a *NotSingularError when more than one Work entity is found.
// Returns a *NotFoundError when no Work entities are found.
func (wq *WorkQuery) Only(ctx context.Context) (*Work, error) {
	nodes, err := wq.Limit(2).All(setContextOp(ctx, wq.ctx, "Only"))
	if err != nil {
		return nil, err
	}
	switch len(nodes) {
	case 1:
		return nodes[0], nil
	case 0:
		return nil, &NotFoundError{work.Label}
	default:
		return nil, &NotSingularError{work.Label}
	}
}

// OnlyX is like Only, but panics if an error occurs.
func (wq *WorkQuery) OnlyX(ctx context.Context) *Work {
	node, err := wq.Only(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// OnlyID is like Only, but returns the only Work ID in the query.
// Returns a *NotSingularError when more than one Work ID is found.
// Returns a *NotFoundError when no entities are found.
func (wq *WorkQuery) OnlyID(ctx context.Context) (id string, err error) {
	var ids []string
	if ids, err = wq.Limit(2).IDs(setContextOp(ctx, wq.ctx, "OnlyID")); err != nil {
		return
	}
	switch len(ids) {
	case 1:
		id = ids[0]
	case 0:
		err = &NotFoundError{work.Label}
	default:
		err = &NotSingularError{work.Label}
	}
	return
}

// OnlyIDX is like OnlyID, but panics if an error occurs.
func (wq *WorkQuery) OnlyIDX(ctx context.Context) string {
	id, err := wq.OnlyID(ctx)
	if err != nil {
		panic(err)
	}
	return id
}

// All executes the query and returns a list of Works.
func (wq *WorkQuery) All(ctx context.Context) ([]*Work, error) {
	ctx = setContextOp(ctx, wq.ctx, "All")
	if err := wq.prepareQuery(ctx); err != nil {
		return nil, err
	}
	qr := querierAll[[]*Work, *WorkQuery]()
	return withInterceptors[[]*Work](ctx, wq, qr, wq.inters)
}

// AllX is like All, but panics if an error occurs.
func (wq *WorkQuery) AllX(ctx context.Context) []*Work {
	nodes, err := wq.All(ctx)
	if err != nil {
		panic(err)
	}
	return nodes
}

// IDs executes the query and returns a list of Work IDs.
func (wq *WorkQuery) IDs(ctx context.Context) (ids []string, err error) {
	if wq.ctx.Unique == nil && wq.path != nil {
		wq.Unique(true)
	}
	ctx = setContextOp(ctx, wq.ctx, "IDs")
	if err = wq.Select(work.FieldID).Scan(ctx, &ids); err != nil {
		return nil, err
	}
	return ids, nil
}

// IDsX is like IDs, but panics if an error occurs.
func (wq *WorkQuery) IDsX(ctx context.Context) []string {
	ids, err := wq.IDs(ctx)
	if err != nil {
		panic(err)
	}
	return ids
}

// Count returns the count of the given query.
func (wq *WorkQuery) Count(ctx context.Context) (int, error) {
	ctx = setContextOp(ctx, wq.ctx, "Count")
	if err := wq.prepareQuery(ctx); err != nil {
		return 0, err
	}
	return withInterceptors[int](ctx, wq, querierCount[*WorkQuery](), wq.inters)
}

// CountX is like Count, but panics if an error occurs.
func (wq *WorkQuery) CountX(ctx context.Context) int {
	count, err := wq.Count(ctx)
	if err != nil {
		panic(err)
	}
	return count
}

// Exist returns true if the query has elements in the graph.
func (wq *WorkQuery) Exist(ctx context.Context) (bool, error) {
	ctx = setContextOp(ctx, wq.ctx, "Exist")
	switch _, err := wq.FirstID(ctx); {
	case IsNotFound(err):
		return false, nil
	case err != nil:
		return false, fmt.Errorf("ent: check existence: %w", err)
	default:
		return true, nil
	}
}

// ExistX is like Exist, but panics if an error occurs.
func (wq *WorkQuery) ExistX(ctx context.Context) bool {
	exist, err := wq.Exist(ctx)
	if err != nil {
		panic(err)
	}
	return exist
}

// Clone returns a duplicate of the WorkQuery builder, including all associated steps. It can be
// used to prepare common query builders and use them differently after the clone is made.
func (wq *WorkQuery) Clone() *WorkQuery {
	if wq == nil {
		return nil
	}
	return &WorkQuery{
		config:     wq.config,
		ctx:        wq.ctx.Clone(),
		order:      append([]work.OrderOption{}, wq.order...),
		inters:     append([]Interceptor{}, wq.inters...),
		predicates: append([]predicate.Work{}, wq.predicates...),
		withAuthor: wq.withAuthor.Clone(),
		withParts:  wq.withParts.Clone(),
		// clone intermediate query.
		sql:  wq.sql.Clone(),
		path: wq.path,
	}
}

// WithAuthor tells the query-builder to eager-load the nodes that are connected to
// the "author" edge. The optional arguments are used to configure the query builder of the edge.
func (wq *WorkQuery) WithAuthor(opts ...func(*UserQuery)) *WorkQuery {
	query := (&UserClient{config: wq.config}).Query()
	for _, opt := range opts {
		opt(query)
	}
	wq.withAuthor = query
	return wq
}

// WithParts tells the query-builder to eager-load the nodes that are connected to
// the "parts" edge. The optional arguments are used to configure the query builder of the edge.
func (wq *WorkQuery) WithParts(opts ...func(*PartQuery)) *WorkQuery {
	query := (&PartClient{config: wq.config}).Query()
	for _, opt := range opts {
		opt(query)
	}
	wq.withParts = query
	return wq
}

// GroupBy is used to group vertices by one or more fields/columns.
// It is often used with aggregate functions, like: count, max, mean, min, sum.
//
// Example:
//
//	var v []struct {
//		Name string `json:"name,omitempty"`
//		Count int `json:"count,omitempty"`
//	}
//
//	client.Work.Query().
//		GroupBy(work.FieldName).
//		Aggregate(ent.Count()).
//		Scan(ctx, &v)
func (wq *WorkQuery) GroupBy(field string, fields ...string) *WorkGroupBy {
	wq.ctx.Fields = append([]string{field}, fields...)
	grbuild := &WorkGroupBy{build: wq}
	grbuild.flds = &wq.ctx.Fields
	grbuild.label = work.Label
	grbuild.scan = grbuild.Scan
	return grbuild
}

// Select allows the selection one or more fields/columns for the given query,
// instead of selecting all fields in the entity.
//
// Example:
//
//	var v []struct {
//		Name string `json:"name,omitempty"`
//	}
//
//	client.Work.Query().
//		Select(work.FieldName).
//		Scan(ctx, &v)
func (wq *WorkQuery) Select(fields ...string) *WorkSelect {
	wq.ctx.Fields = append(wq.ctx.Fields, fields...)
	sbuild := &WorkSelect{WorkQuery: wq}
	sbuild.label = work.Label
	sbuild.flds, sbuild.scan = &wq.ctx.Fields, sbuild.Scan
	return sbuild
}

// Aggregate returns a WorkSelect configured with the given aggregations.
func (wq *WorkQuery) Aggregate(fns ...AggregateFunc) *WorkSelect {
	return wq.Select().Aggregate(fns...)
}

func (wq *WorkQuery) prepareQuery(ctx context.Context) error {
	for _, inter := range wq.inters {
		if inter == nil {
			return fmt.Errorf("ent: uninitialized interceptor (forgotten import ent/runtime?)")
		}
		if trv, ok := inter.(Traverser); ok {
			if err := trv.Traverse(ctx, wq); err != nil {
				return err
			}
		}
	}
	for _, f := range wq.ctx.Fields {
		if !work.ValidColumn(f) {
			return &ValidationError{Name: f, err: fmt.Errorf("ent: invalid field %q for query", f)}
		}
	}
	if wq.path != nil {
		prev, err := wq.path(ctx)
		if err != nil {
			return err
		}
		wq.sql = prev
	}
	return nil
}

func (wq *WorkQuery) sqlAll(ctx context.Context, hooks ...queryHook) ([]*Work, error) {
	var (
		nodes       = []*Work{}
		_spec       = wq.querySpec()
		loadedTypes = [2]bool{
			wq.withAuthor != nil,
			wq.withParts != nil,
		}
	)
	_spec.ScanValues = func(columns []string) ([]any, error) {
		return (*Work).scanValues(nil, columns)
	}
	_spec.Assign = func(columns []string, values []any) error {
		node := &Work{config: wq.config}
		nodes = append(nodes, node)
		node.Edges.loadedTypes = loadedTypes
		return node.assignValues(columns, values)
	}
	if len(wq.modifiers) > 0 {
		_spec.Modifiers = wq.modifiers
	}
	for i := range hooks {
		hooks[i](ctx, _spec)
	}
	if err := sqlgraph.QueryNodes(ctx, wq.driver, _spec); err != nil {
		return nil, err
	}
	if len(nodes) == 0 {
		return nodes, nil
	}
	if query := wq.withAuthor; query != nil {
		if err := wq.loadAuthor(ctx, query, nodes, nil,
			func(n *Work, e *User) { n.Edges.Author = e }); err != nil {
			return nil, err
		}
	}
	if query := wq.withParts; query != nil {
		if err := wq.loadParts(ctx, query, nodes,
			func(n *Work) { n.Edges.Parts = []*Part{} },
			func(n *Work, e *Part) { n.Edges.Parts = append(n.Edges.Parts, e) }); err != nil {
			return nil, err
		}
	}
	for name, query := range wq.withNamedParts {
		if err := wq.loadParts(ctx, query, nodes,
			func(n *Work) { n.appendNamedParts(name) },
			func(n *Work, e *Part) { n.appendNamedParts(name, e) }); err != nil {
			return nil, err
		}
	}
	for i := range wq.loadTotal {
		if err := wq.loadTotal[i](ctx, nodes); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

func (wq *WorkQuery) loadAuthor(ctx context.Context, query *UserQuery, nodes []*Work, init func(*Work), assign func(*Work, *User)) error {
	ids := make([]string, 0, len(nodes))
	nodeids := make(map[string][]*Work)
	for i := range nodes {
		fk := nodes[i].AuthorID
		if _, ok := nodeids[fk]; !ok {
			ids = append(ids, fk)
		}
		nodeids[fk] = append(nodeids[fk], nodes[i])
	}
	if len(ids) == 0 {
		return nil
	}
	query.Where(user.IDIn(ids...))
	neighbors, err := query.All(ctx)
	if err != nil {
		return err
	}
	for _, n := range neighbors {
		nodes, ok := nodeids[n.ID]
		if !ok {
			return fmt.Errorf(`unexpected foreign-key "author_id" returned %v`, n.ID)
		}
		for i := range nodes {
			assign(nodes[i], n)
		}
	}
	return nil
}
func (wq *WorkQuery) loadParts(ctx context.Context, query *PartQuery, nodes []*Work, init func(*Work), assign func(*Work, *Part)) error {
	fks := make([]driver.Value, 0, len(nodes))
	nodeids := make(map[string]*Work)
	for i := range nodes {
		fks = append(fks, nodes[i].ID)
		nodeids[nodes[i].ID] = nodes[i]
		if init != nil {
			init(nodes[i])
		}
	}
	if len(query.ctx.Fields) > 0 {
		query.ctx.AppendFieldOnce(part.FieldWorkID)
	}
	query.Where(predicate.Part(func(s *sql.Selector) {
		s.Where(sql.InValues(s.C(work.PartsColumn), fks...))
	}))
	neighbors, err := query.All(ctx)
	if err != nil {
		return err
	}
	for _, n := range neighbors {
		fk := n.WorkID
		node, ok := nodeids[fk]
		if !ok {
			return fmt.Errorf(`unexpected referenced foreign-key "work_id" returned %v for node %v`, fk, n.ID)
		}
		assign(node, n)
	}
	return nil
}

func (wq *WorkQuery) sqlCount(ctx context.Context) (int, error) {
	_spec := wq.querySpec()
	if len(wq.modifiers) > 0 {
		_spec.Modifiers = wq.modifiers
	}
	_spec.Node.Columns = wq.ctx.Fields
	if len(wq.ctx.Fields) > 0 {
		_spec.Unique = wq.ctx.Unique != nil && *wq.ctx.Unique
	}
	return sqlgraph.CountNodes(ctx, wq.driver, _spec)
}

func (wq *WorkQuery) querySpec() *sqlgraph.QuerySpec {
	_spec := sqlgraph.NewQuerySpec(work.Table, work.Columns, sqlgraph.NewFieldSpec(work.FieldID, field.TypeString))
	_spec.From = wq.sql
	if unique := wq.ctx.Unique; unique != nil {
		_spec.Unique = *unique
	} else if wq.path != nil {
		_spec.Unique = true
	}
	if fields := wq.ctx.Fields; len(fields) > 0 {
		_spec.Node.Columns = make([]string, 0, len(fields))
		_spec.Node.Columns = append(_spec.Node.Columns, work.FieldID)
		for i := range fields {
			if fields[i] != work.FieldID {
				_spec.Node.Columns = append(_spec.Node.Columns, fields[i])
			}
		}
		if wq.withAuthor != nil {
			_spec.Node.AddColumnOnce(work.FieldAuthorID)
		}
	}
	if ps := wq.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if limit := wq.ctx.Limit; limit != nil {
		_spec.Limit = *limit
	}
	if offset := wq.ctx.Offset; offset != nil {
		_spec.Offset = *offset
	}
	if ps := wq.order; len(ps) > 0 {
		_spec.Order = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	return _spec
}

func (wq *WorkQuery) sqlQuery(ctx context.Context) *sql.Selector {
	builder := sql.Dialect(wq.driver.Dialect())
	t1 := builder.Table(work.Table)
	columns := wq.ctx.Fields
	if len(columns) == 0 {
		columns = work.Columns
	}
	selector := builder.Select(t1.Columns(columns...)...).From(t1)
	if wq.sql != nil {
		selector = wq.sql
		selector.Select(selector.Columns(columns...)...)
	}
	if wq.ctx.Unique != nil && *wq.ctx.Unique {
		selector.Distinct()
	}
	for _, p := range wq.predicates {
		p(selector)
	}
	for _, p := range wq.order {
		p(selector)
	}
	if offset := wq.ctx.Offset; offset != nil {
		// limit is mandatory for offset clause. We start
		// with default value, and override it below if needed.
		selector.Offset(*offset).Limit(math.MaxInt32)
	}
	if limit := wq.ctx.Limit; limit != nil {
		selector.Limit(*limit)
	}
	return selector
}

// WithNamedParts tells the query-builder to eager-load the nodes that are connected to the "parts"
// edge with the given name. The optional arguments are used to configure the query builder of the edge.
func (wq *WorkQuery) WithNamedParts(name string, opts ...func(*PartQuery)) *WorkQuery {
	query := (&PartClient{config: wq.config}).Query()
	for _, opt := range opts {
		opt(query)
	}
	if wq.withNamedParts == nil {
		wq.withNamedParts = make(map[string]*PartQuery)
	}
	wq.withNamedParts[name] = query
	return wq
}

// WorkGroupBy is the group-by builder for Work entities.
type WorkGroupBy struct {
	selector
	build *WorkQuery
}

// Aggregate adds the given aggregation functions to the group-by query.
func (wgb *WorkGroupBy) Aggregate(fns ...AggregateFunc) *WorkGroupBy {
	wgb.fns = append(wgb.fns, fns...)
	return wgb
}

// Scan applies the selector query and scans the result into the given value.
func (wgb *WorkGroupBy) Scan(ctx context.Context, v any) error {
	ctx = setContextOp(ctx, wgb.build.ctx, "GroupBy")
	if err := wgb.build.prepareQuery(ctx); err != nil {
		return err
	}
	return scanWithInterceptors[*WorkQuery, *WorkGroupBy](ctx, wgb.build, wgb, wgb.build.inters, v)
}

func (wgb *WorkGroupBy) sqlScan(ctx context.Context, root *WorkQuery, v any) error {
	selector := root.sqlQuery(ctx).Select()
	aggregation := make([]string, 0, len(wgb.fns))
	for _, fn := range wgb.fns {
		aggregation = append(aggregation, fn(selector))
	}
	if len(selector.SelectedColumns()) == 0 {
		columns := make([]string, 0, len(*wgb.flds)+len(wgb.fns))
		for _, f := range *wgb.flds {
			columns = append(columns, selector.C(f))
		}
		columns = append(columns, aggregation...)
		selector.Select(columns...)
	}
	selector.GroupBy(selector.Columns(*wgb.flds...)...)
	if err := selector.Err(); err != nil {
		return err
	}
	rows := &sql.Rows{}
	query, args := selector.Query()
	if err := wgb.build.driver.Query(ctx, query, args, rows); err != nil {
		return err
	}
	defer rows.Close()
	return sql.ScanSlice(rows, v)
}

// WorkSelect is the builder for selecting fields of Work entities.
type WorkSelect struct {
	*WorkQuery
	selector
}

// Aggregate adds the given aggregation functions to the selector query.
func (ws *WorkSelect) Aggregate(fns ...AggregateFunc) *WorkSelect {
	ws.fns = append(ws.fns, fns...)
	return ws
}

// Scan applies the selector query and scans the result into the given value.
func (ws *WorkSelect) Scan(ctx context.Context, v any) error {
	ctx = setContextOp(ctx, ws.ctx, "Select")
	if err := ws.prepareQuery(ctx); err != nil {
		return err
	}
	return scanWithInterceptors[*WorkQuery, *WorkSelect](ctx, ws.WorkQuery, ws, ws.inters, v)
}

func (ws *WorkSelect) sqlScan(ctx context.Context, root *WorkQuery, v any) error {
	selector := root.sqlQuery(ctx)
	aggregation := make([]string, 0, len(ws.fns))
	for _, fn := range ws.fns {
		aggregation = append(aggregation, fn(selector))
	}
	switch n := len(*ws.selector.flds); {
	case n == 0 && len(aggregation) > 0:
		selector.Select(aggregation...)
	case n != 0 && len(aggregation) > 0:
		selector.AppendSelect(aggregation...)
	}
	rows := &sql.Rows{}
	query, args := selector.Query()
	if err := ws.driver.Query(ctx, query, args, rows); err != nil {
		return err
	}
	defer rows.Close()
	return sql.ScanSlice(rows, v)
}
