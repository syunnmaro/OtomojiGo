// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"errors"
	"fmt"
	"graphql-test-api/ent/predicate"
	"graphql-test-api/ent/user"
	"graphql-test-api/ent/work"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
)

// UserUpdate is the builder for updating User entities.
type UserUpdate struct {
	config
	hooks    []Hook
	mutation *UserMutation
}

// Where appends a list predicates to the UserUpdate builder.
func (uu *UserUpdate) Where(ps ...predicate.User) *UserUpdate {
	uu.mutation.Where(ps...)
	return uu
}

// SetGoogleID sets the "google_id" field.
func (uu *UserUpdate) SetGoogleID(s string) *UserUpdate {
	uu.mutation.SetGoogleID(s)
	return uu
}

// SetNillableGoogleID sets the "google_id" field if the given value is not nil.
func (uu *UserUpdate) SetNillableGoogleID(s *string) *UserUpdate {
	if s != nil {
		uu.SetGoogleID(*s)
	}
	return uu
}

// SetStripeID sets the "stripe_id" field.
func (uu *UserUpdate) SetStripeID(s string) *UserUpdate {
	uu.mutation.SetStripeID(s)
	return uu
}

// SetNillableStripeID sets the "stripe_id" field if the given value is not nil.
func (uu *UserUpdate) SetNillableStripeID(s *string) *UserUpdate {
	if s != nil {
		uu.SetStripeID(*s)
	}
	return uu
}

// SetPoint sets the "point" field.
func (uu *UserUpdate) SetPoint(i int) *UserUpdate {
	uu.mutation.ResetPoint()
	uu.mutation.SetPoint(i)
	return uu
}

// SetNillablePoint sets the "point" field if the given value is not nil.
func (uu *UserUpdate) SetNillablePoint(i *int) *UserUpdate {
	if i != nil {
		uu.SetPoint(*i)
	}
	return uu
}

// AddPoint adds i to the "point" field.
func (uu *UserUpdate) AddPoint(i int) *UserUpdate {
	uu.mutation.AddPoint(i)
	return uu
}

// AddWorkIDs adds the "works" edge to the Work entity by IDs.
func (uu *UserUpdate) AddWorkIDs(ids ...string) *UserUpdate {
	uu.mutation.AddWorkIDs(ids...)
	return uu
}

// AddWorks adds the "works" edges to the Work entity.
func (uu *UserUpdate) AddWorks(w ...*Work) *UserUpdate {
	ids := make([]string, len(w))
	for i := range w {
		ids[i] = w[i].ID
	}
	return uu.AddWorkIDs(ids...)
}

// Mutation returns the UserMutation object of the builder.
func (uu *UserUpdate) Mutation() *UserMutation {
	return uu.mutation
}

// ClearWorks clears all "works" edges to the Work entity.
func (uu *UserUpdate) ClearWorks() *UserUpdate {
	uu.mutation.ClearWorks()
	return uu
}

// RemoveWorkIDs removes the "works" edge to Work entities by IDs.
func (uu *UserUpdate) RemoveWorkIDs(ids ...string) *UserUpdate {
	uu.mutation.RemoveWorkIDs(ids...)
	return uu
}

// RemoveWorks removes "works" edges to Work entities.
func (uu *UserUpdate) RemoveWorks(w ...*Work) *UserUpdate {
	ids := make([]string, len(w))
	for i := range w {
		ids[i] = w[i].ID
	}
	return uu.RemoveWorkIDs(ids...)
}

// Save executes the query and returns the number of nodes affected by the update operation.
func (uu *UserUpdate) Save(ctx context.Context) (int, error) {
	return withHooks(ctx, uu.sqlSave, uu.mutation, uu.hooks)
}

// SaveX is like Save, but panics if an error occurs.
func (uu *UserUpdate) SaveX(ctx context.Context) int {
	affected, err := uu.Save(ctx)
	if err != nil {
		panic(err)
	}
	return affected
}

// Exec executes the query.
func (uu *UserUpdate) Exec(ctx context.Context) error {
	_, err := uu.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (uu *UserUpdate) ExecX(ctx context.Context) {
	if err := uu.Exec(ctx); err != nil {
		panic(err)
	}
}

func (uu *UserUpdate) sqlSave(ctx context.Context) (n int, err error) {
	_spec := sqlgraph.NewUpdateSpec(user.Table, user.Columns, sqlgraph.NewFieldSpec(user.FieldID, field.TypeString))
	if ps := uu.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := uu.mutation.GoogleID(); ok {
		_spec.SetField(user.FieldGoogleID, field.TypeString, value)
	}
	if value, ok := uu.mutation.StripeID(); ok {
		_spec.SetField(user.FieldStripeID, field.TypeString, value)
	}
	if value, ok := uu.mutation.Point(); ok {
		_spec.SetField(user.FieldPoint, field.TypeInt, value)
	}
	if value, ok := uu.mutation.AddedPoint(); ok {
		_spec.AddField(user.FieldPoint, field.TypeInt, value)
	}
	if uu.mutation.WorksCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   user.WorksTable,
			Columns: []string{user.WorksColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(work.FieldID, field.TypeString),
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := uu.mutation.RemovedWorksIDs(); len(nodes) > 0 && !uu.mutation.WorksCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   user.WorksTable,
			Columns: []string{user.WorksColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(work.FieldID, field.TypeString),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := uu.mutation.WorksIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   user.WorksTable,
			Columns: []string{user.WorksColumn},
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
	if n, err = sqlgraph.UpdateNodes(ctx, uu.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{user.Label}
		} else if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{msg: err.Error(), wrap: err}
		}
		return 0, err
	}
	uu.mutation.done = true
	return n, nil
}

// UserUpdateOne is the builder for updating a single User entity.
type UserUpdateOne struct {
	config
	fields   []string
	hooks    []Hook
	mutation *UserMutation
}

// SetGoogleID sets the "google_id" field.
func (uuo *UserUpdateOne) SetGoogleID(s string) *UserUpdateOne {
	uuo.mutation.SetGoogleID(s)
	return uuo
}

// SetNillableGoogleID sets the "google_id" field if the given value is not nil.
func (uuo *UserUpdateOne) SetNillableGoogleID(s *string) *UserUpdateOne {
	if s != nil {
		uuo.SetGoogleID(*s)
	}
	return uuo
}

// SetStripeID sets the "stripe_id" field.
func (uuo *UserUpdateOne) SetStripeID(s string) *UserUpdateOne {
	uuo.mutation.SetStripeID(s)
	return uuo
}

// SetNillableStripeID sets the "stripe_id" field if the given value is not nil.
func (uuo *UserUpdateOne) SetNillableStripeID(s *string) *UserUpdateOne {
	if s != nil {
		uuo.SetStripeID(*s)
	}
	return uuo
}

// SetPoint sets the "point" field.
func (uuo *UserUpdateOne) SetPoint(i int) *UserUpdateOne {
	uuo.mutation.ResetPoint()
	uuo.mutation.SetPoint(i)
	return uuo
}

// SetNillablePoint sets the "point" field if the given value is not nil.
func (uuo *UserUpdateOne) SetNillablePoint(i *int) *UserUpdateOne {
	if i != nil {
		uuo.SetPoint(*i)
	}
	return uuo
}

// AddPoint adds i to the "point" field.
func (uuo *UserUpdateOne) AddPoint(i int) *UserUpdateOne {
	uuo.mutation.AddPoint(i)
	return uuo
}

// AddWorkIDs adds the "works" edge to the Work entity by IDs.
func (uuo *UserUpdateOne) AddWorkIDs(ids ...string) *UserUpdateOne {
	uuo.mutation.AddWorkIDs(ids...)
	return uuo
}

// AddWorks adds the "works" edges to the Work entity.
func (uuo *UserUpdateOne) AddWorks(w ...*Work) *UserUpdateOne {
	ids := make([]string, len(w))
	for i := range w {
		ids[i] = w[i].ID
	}
	return uuo.AddWorkIDs(ids...)
}

// Mutation returns the UserMutation object of the builder.
func (uuo *UserUpdateOne) Mutation() *UserMutation {
	return uuo.mutation
}

// ClearWorks clears all "works" edges to the Work entity.
func (uuo *UserUpdateOne) ClearWorks() *UserUpdateOne {
	uuo.mutation.ClearWorks()
	return uuo
}

// RemoveWorkIDs removes the "works" edge to Work entities by IDs.
func (uuo *UserUpdateOne) RemoveWorkIDs(ids ...string) *UserUpdateOne {
	uuo.mutation.RemoveWorkIDs(ids...)
	return uuo
}

// RemoveWorks removes "works" edges to Work entities.
func (uuo *UserUpdateOne) RemoveWorks(w ...*Work) *UserUpdateOne {
	ids := make([]string, len(w))
	for i := range w {
		ids[i] = w[i].ID
	}
	return uuo.RemoveWorkIDs(ids...)
}

// Where appends a list predicates to the UserUpdate builder.
func (uuo *UserUpdateOne) Where(ps ...predicate.User) *UserUpdateOne {
	uuo.mutation.Where(ps...)
	return uuo
}

// Select allows selecting one or more fields (columns) of the returned entity.
// The default is selecting all fields defined in the entity schema.
func (uuo *UserUpdateOne) Select(field string, fields ...string) *UserUpdateOne {
	uuo.fields = append([]string{field}, fields...)
	return uuo
}

// Save executes the query and returns the updated User entity.
func (uuo *UserUpdateOne) Save(ctx context.Context) (*User, error) {
	return withHooks(ctx, uuo.sqlSave, uuo.mutation, uuo.hooks)
}

// SaveX is like Save, but panics if an error occurs.
func (uuo *UserUpdateOne) SaveX(ctx context.Context) *User {
	node, err := uuo.Save(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// Exec executes the query on the entity.
func (uuo *UserUpdateOne) Exec(ctx context.Context) error {
	_, err := uuo.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (uuo *UserUpdateOne) ExecX(ctx context.Context) {
	if err := uuo.Exec(ctx); err != nil {
		panic(err)
	}
}

func (uuo *UserUpdateOne) sqlSave(ctx context.Context) (_node *User, err error) {
	_spec := sqlgraph.NewUpdateSpec(user.Table, user.Columns, sqlgraph.NewFieldSpec(user.FieldID, field.TypeString))
	id, ok := uuo.mutation.ID()
	if !ok {
		return nil, &ValidationError{Name: "id", err: errors.New(`ent: missing "User.id" for update`)}
	}
	_spec.Node.ID.Value = id
	if fields := uuo.fields; len(fields) > 0 {
		_spec.Node.Columns = make([]string, 0, len(fields))
		_spec.Node.Columns = append(_spec.Node.Columns, user.FieldID)
		for _, f := range fields {
			if !user.ValidColumn(f) {
				return nil, &ValidationError{Name: f, err: fmt.Errorf("ent: invalid field %q for query", f)}
			}
			if f != user.FieldID {
				_spec.Node.Columns = append(_spec.Node.Columns, f)
			}
		}
	}
	if ps := uuo.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := uuo.mutation.GoogleID(); ok {
		_spec.SetField(user.FieldGoogleID, field.TypeString, value)
	}
	if value, ok := uuo.mutation.StripeID(); ok {
		_spec.SetField(user.FieldStripeID, field.TypeString, value)
	}
	if value, ok := uuo.mutation.Point(); ok {
		_spec.SetField(user.FieldPoint, field.TypeInt, value)
	}
	if value, ok := uuo.mutation.AddedPoint(); ok {
		_spec.AddField(user.FieldPoint, field.TypeInt, value)
	}
	if uuo.mutation.WorksCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   user.WorksTable,
			Columns: []string{user.WorksColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(work.FieldID, field.TypeString),
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := uuo.mutation.RemovedWorksIDs(); len(nodes) > 0 && !uuo.mutation.WorksCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   user.WorksTable,
			Columns: []string{user.WorksColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(work.FieldID, field.TypeString),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := uuo.mutation.WorksIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   user.WorksTable,
			Columns: []string{user.WorksColumn},
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
	_node = &User{config: uuo.config}
	_spec.Assign = _node.assignValues
	_spec.ScanValues = _node.scanValues
	if err = sqlgraph.UpdateNode(ctx, uuo.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{user.Label}
		} else if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{msg: err.Error(), wrap: err}
		}
		return nil, err
	}
	uuo.mutation.done = true
	return _node, nil
}
