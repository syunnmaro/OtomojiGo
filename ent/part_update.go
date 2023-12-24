// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"errors"
	"fmt"
	"graphql-test-api/ent/block"
	"graphql-test-api/ent/part"
	"graphql-test-api/ent/predicate"
	"graphql-test-api/ent/work"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
)

// PartUpdate is the builder for updating Part entities.
type PartUpdate struct {
	config
	hooks    []Hook
	mutation *PartMutation
}

// Where appends a list predicates to the PartUpdate builder.
func (pu *PartUpdate) Where(ps ...predicate.Part) *PartUpdate {
	pu.mutation.Where(ps...)
	return pu
}

// SetName sets the "name" field.
func (pu *PartUpdate) SetName(s string) *PartUpdate {
	pu.mutation.SetName(s)
	return pu
}

// SetNillableName sets the "name" field if the given value is not nil.
func (pu *PartUpdate) SetNillableName(s *string) *PartUpdate {
	if s != nil {
		pu.SetName(*s)
	}
	return pu
}

// SetWorkID sets the "work_id" field.
func (pu *PartUpdate) SetWorkID(s string) *PartUpdate {
	pu.mutation.SetWorkID(s)
	return pu
}

// SetNillableWorkID sets the "work_id" field if the given value is not nil.
func (pu *PartUpdate) SetNillableWorkID(s *string) *PartUpdate {
	if s != nil {
		pu.SetWorkID(*s)
	}
	return pu
}

// SetAuthorID sets the "author_id" field.
func (pu *PartUpdate) SetAuthorID(s string) *PartUpdate {
	pu.mutation.SetAuthorID(s)
	return pu
}

// SetNillableAuthorID sets the "author_id" field if the given value is not nil.
func (pu *PartUpdate) SetNillableAuthorID(s *string) *PartUpdate {
	if s != nil {
		pu.SetAuthorID(*s)
	}
	return pu
}

// SetWork sets the "work" edge to the Work entity.
func (pu *PartUpdate) SetWork(w *Work) *PartUpdate {
	return pu.SetWorkID(w.ID)
}

// AddBlockIDs adds the "blocks" edge to the Block entity by IDs.
func (pu *PartUpdate) AddBlockIDs(ids ...string) *PartUpdate {
	pu.mutation.AddBlockIDs(ids...)
	return pu
}

// AddBlocks adds the "blocks" edges to the Block entity.
func (pu *PartUpdate) AddBlocks(b ...*Block) *PartUpdate {
	ids := make([]string, len(b))
	for i := range b {
		ids[i] = b[i].ID
	}
	return pu.AddBlockIDs(ids...)
}

// Mutation returns the PartMutation object of the builder.
func (pu *PartUpdate) Mutation() *PartMutation {
	return pu.mutation
}

// ClearWork clears the "work" edge to the Work entity.
func (pu *PartUpdate) ClearWork() *PartUpdate {
	pu.mutation.ClearWork()
	return pu
}

// ClearBlocks clears all "blocks" edges to the Block entity.
func (pu *PartUpdate) ClearBlocks() *PartUpdate {
	pu.mutation.ClearBlocks()
	return pu
}

// RemoveBlockIDs removes the "blocks" edge to Block entities by IDs.
func (pu *PartUpdate) RemoveBlockIDs(ids ...string) *PartUpdate {
	pu.mutation.RemoveBlockIDs(ids...)
	return pu
}

// RemoveBlocks removes "blocks" edges to Block entities.
func (pu *PartUpdate) RemoveBlocks(b ...*Block) *PartUpdate {
	ids := make([]string, len(b))
	for i := range b {
		ids[i] = b[i].ID
	}
	return pu.RemoveBlockIDs(ids...)
}

// Save executes the query and returns the number of nodes affected by the update operation.
func (pu *PartUpdate) Save(ctx context.Context) (int, error) {
	return withHooks(ctx, pu.sqlSave, pu.mutation, pu.hooks)
}

// SaveX is like Save, but panics if an error occurs.
func (pu *PartUpdate) SaveX(ctx context.Context) int {
	affected, err := pu.Save(ctx)
	if err != nil {
		panic(err)
	}
	return affected
}

// Exec executes the query.
func (pu *PartUpdate) Exec(ctx context.Context) error {
	_, err := pu.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (pu *PartUpdate) ExecX(ctx context.Context) {
	if err := pu.Exec(ctx); err != nil {
		panic(err)
	}
}

// check runs all checks and user-defined validators on the builder.
func (pu *PartUpdate) check() error {
	if _, ok := pu.mutation.WorkID(); pu.mutation.WorkCleared() && !ok {
		return errors.New(`ent: clearing a required unique edge "Part.work"`)
	}
	return nil
}

func (pu *PartUpdate) sqlSave(ctx context.Context) (n int, err error) {
	if err := pu.check(); err != nil {
		return n, err
	}
	_spec := sqlgraph.NewUpdateSpec(part.Table, part.Columns, sqlgraph.NewFieldSpec(part.FieldID, field.TypeString))
	if ps := pu.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := pu.mutation.Name(); ok {
		_spec.SetField(part.FieldName, field.TypeString, value)
	}
	if value, ok := pu.mutation.AuthorID(); ok {
		_spec.SetField(part.FieldAuthorID, field.TypeString, value)
	}
	if pu.mutation.WorkCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   part.WorkTable,
			Columns: []string{part.WorkColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(work.FieldID, field.TypeString),
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := pu.mutation.WorkIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   part.WorkTable,
			Columns: []string{part.WorkColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(work.FieldID, field.TypeString),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if pu.mutation.BlocksCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   part.BlocksTable,
			Columns: []string{part.BlocksColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(block.FieldID, field.TypeString),
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := pu.mutation.RemovedBlocksIDs(); len(nodes) > 0 && !pu.mutation.BlocksCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   part.BlocksTable,
			Columns: []string{part.BlocksColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(block.FieldID, field.TypeString),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := pu.mutation.BlocksIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   part.BlocksTable,
			Columns: []string{part.BlocksColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(block.FieldID, field.TypeString),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if n, err = sqlgraph.UpdateNodes(ctx, pu.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{part.Label}
		} else if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{msg: err.Error(), wrap: err}
		}
		return 0, err
	}
	pu.mutation.done = true
	return n, nil
}

// PartUpdateOne is the builder for updating a single Part entity.
type PartUpdateOne struct {
	config
	fields   []string
	hooks    []Hook
	mutation *PartMutation
}

// SetName sets the "name" field.
func (puo *PartUpdateOne) SetName(s string) *PartUpdateOne {
	puo.mutation.SetName(s)
	return puo
}

// SetNillableName sets the "name" field if the given value is not nil.
func (puo *PartUpdateOne) SetNillableName(s *string) *PartUpdateOne {
	if s != nil {
		puo.SetName(*s)
	}
	return puo
}

// SetWorkID sets the "work_id" field.
func (puo *PartUpdateOne) SetWorkID(s string) *PartUpdateOne {
	puo.mutation.SetWorkID(s)
	return puo
}

// SetNillableWorkID sets the "work_id" field if the given value is not nil.
func (puo *PartUpdateOne) SetNillableWorkID(s *string) *PartUpdateOne {
	if s != nil {
		puo.SetWorkID(*s)
	}
	return puo
}

// SetAuthorID sets the "author_id" field.
func (puo *PartUpdateOne) SetAuthorID(s string) *PartUpdateOne {
	puo.mutation.SetAuthorID(s)
	return puo
}

// SetNillableAuthorID sets the "author_id" field if the given value is not nil.
func (puo *PartUpdateOne) SetNillableAuthorID(s *string) *PartUpdateOne {
	if s != nil {
		puo.SetAuthorID(*s)
	}
	return puo
}

// SetWork sets the "work" edge to the Work entity.
func (puo *PartUpdateOne) SetWork(w *Work) *PartUpdateOne {
	return puo.SetWorkID(w.ID)
}

// AddBlockIDs adds the "blocks" edge to the Block entity by IDs.
func (puo *PartUpdateOne) AddBlockIDs(ids ...string) *PartUpdateOne {
	puo.mutation.AddBlockIDs(ids...)
	return puo
}

// AddBlocks adds the "blocks" edges to the Block entity.
func (puo *PartUpdateOne) AddBlocks(b ...*Block) *PartUpdateOne {
	ids := make([]string, len(b))
	for i := range b {
		ids[i] = b[i].ID
	}
	return puo.AddBlockIDs(ids...)
}

// Mutation returns the PartMutation object of the builder.
func (puo *PartUpdateOne) Mutation() *PartMutation {
	return puo.mutation
}

// ClearWork clears the "work" edge to the Work entity.
func (puo *PartUpdateOne) ClearWork() *PartUpdateOne {
	puo.mutation.ClearWork()
	return puo
}

// ClearBlocks clears all "blocks" edges to the Block entity.
func (puo *PartUpdateOne) ClearBlocks() *PartUpdateOne {
	puo.mutation.ClearBlocks()
	return puo
}

// RemoveBlockIDs removes the "blocks" edge to Block entities by IDs.
func (puo *PartUpdateOne) RemoveBlockIDs(ids ...string) *PartUpdateOne {
	puo.mutation.RemoveBlockIDs(ids...)
	return puo
}

// RemoveBlocks removes "blocks" edges to Block entities.
func (puo *PartUpdateOne) RemoveBlocks(b ...*Block) *PartUpdateOne {
	ids := make([]string, len(b))
	for i := range b {
		ids[i] = b[i].ID
	}
	return puo.RemoveBlockIDs(ids...)
}

// Where appends a list predicates to the PartUpdate builder.
func (puo *PartUpdateOne) Where(ps ...predicate.Part) *PartUpdateOne {
	puo.mutation.Where(ps...)
	return puo
}

// Select allows selecting one or more fields (columns) of the returned entity.
// The default is selecting all fields defined in the entity schema.
func (puo *PartUpdateOne) Select(field string, fields ...string) *PartUpdateOne {
	puo.fields = append([]string{field}, fields...)
	return puo
}

// Save executes the query and returns the updated Part entity.
func (puo *PartUpdateOne) Save(ctx context.Context) (*Part, error) {
	return withHooks(ctx, puo.sqlSave, puo.mutation, puo.hooks)
}

// SaveX is like Save, but panics if an error occurs.
func (puo *PartUpdateOne) SaveX(ctx context.Context) *Part {
	node, err := puo.Save(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// Exec executes the query on the entity.
func (puo *PartUpdateOne) Exec(ctx context.Context) error {
	_, err := puo.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (puo *PartUpdateOne) ExecX(ctx context.Context) {
	if err := puo.Exec(ctx); err != nil {
		panic(err)
	}
}

// check runs all checks and user-defined validators on the builder.
func (puo *PartUpdateOne) check() error {
	if _, ok := puo.mutation.WorkID(); puo.mutation.WorkCleared() && !ok {
		return errors.New(`ent: clearing a required unique edge "Part.work"`)
	}
	return nil
}

func (puo *PartUpdateOne) sqlSave(ctx context.Context) (_node *Part, err error) {
	if err := puo.check(); err != nil {
		return _node, err
	}
	_spec := sqlgraph.NewUpdateSpec(part.Table, part.Columns, sqlgraph.NewFieldSpec(part.FieldID, field.TypeString))
	id, ok := puo.mutation.ID()
	if !ok {
		return nil, &ValidationError{Name: "id", err: errors.New(`ent: missing "Part.id" for update`)}
	}
	_spec.Node.ID.Value = id
	if fields := puo.fields; len(fields) > 0 {
		_spec.Node.Columns = make([]string, 0, len(fields))
		_spec.Node.Columns = append(_spec.Node.Columns, part.FieldID)
		for _, f := range fields {
			if !part.ValidColumn(f) {
				return nil, &ValidationError{Name: f, err: fmt.Errorf("ent: invalid field %q for query", f)}
			}
			if f != part.FieldID {
				_spec.Node.Columns = append(_spec.Node.Columns, f)
			}
		}
	}
	if ps := puo.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := puo.mutation.Name(); ok {
		_spec.SetField(part.FieldName, field.TypeString, value)
	}
	if value, ok := puo.mutation.AuthorID(); ok {
		_spec.SetField(part.FieldAuthorID, field.TypeString, value)
	}
	if puo.mutation.WorkCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   part.WorkTable,
			Columns: []string{part.WorkColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(work.FieldID, field.TypeString),
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := puo.mutation.WorkIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   part.WorkTable,
			Columns: []string{part.WorkColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(work.FieldID, field.TypeString),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if puo.mutation.BlocksCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   part.BlocksTable,
			Columns: []string{part.BlocksColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(block.FieldID, field.TypeString),
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := puo.mutation.RemovedBlocksIDs(); len(nodes) > 0 && !puo.mutation.BlocksCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   part.BlocksTable,
			Columns: []string{part.BlocksColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(block.FieldID, field.TypeString),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := puo.mutation.BlocksIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   part.BlocksTable,
			Columns: []string{part.BlocksColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(block.FieldID, field.TypeString),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	_node = &Part{config: puo.config}
	_spec.Assign = _node.assignValues
	_spec.ScanValues = _node.scanValues
	if err = sqlgraph.UpdateNode(ctx, puo.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{part.Label}
		} else if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{msg: err.Error(), wrap: err}
		}
		return nil, err
	}
	puo.mutation.done = true
	return _node, nil
}
